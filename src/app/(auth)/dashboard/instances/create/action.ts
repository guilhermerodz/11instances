"use server";
import { createClient } from "@/server/supabase";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ElevenLabsClient } from "elevenlabs";
import { YoutubeTranscript } from 'youtube-transcript';

const createInstancePayloadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(), 
  sources: z.string(),
});

export async function createInstance(formData: FormData) {
  const payload = createInstancePayloadSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    sources: formData.get("sources"),
  });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const elevenLabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY!,
  });

  const ytUrl = payload.sources;
  
  // Extract video ID from YouTube URL
  let videoId;
  try {
    const url = new URL(ytUrl);
    // Handle both youtube.com and youtu.be URLs
    if (url.hostname === 'youtu.be') {
      videoId = url.pathname.slice(1); // Remove leading slash
    } else if (url.hostname.includes('youtube.com')) {
      videoId = url.searchParams.get('v');
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error("Invalid URL format");
  }

  if (!videoId) {
    throw new Error("Could not extract YouTube video ID from URL");
  }

  // Get transcript
  const transcriptResponse = await YoutubeTranscript.fetchTranscript(videoId);
  const transcript = transcriptResponse.map(t => t.text).join(' ');

  const blob = new Blob([transcript], { type: "text/plain" });

  const knowledgeBase = await elevenLabs.conversationalAi.addToKnowledgeBase({
    file: blob,
  });

  const agent = await elevenLabs.conversationalAi.createAgent({
    name: payload.name,
    conversation_config: {
      agent: {
        first_message: "Hi, I'm a helpful assistant. How can I help you today?",
        prompt: {
          prompt:
            "You are a helpful assistant which speaks in a casual tone which is easy to understand. You are given a transcript of a youtube video and you need to answer questions or assist based on the transcript. It should feel personal and like you are talking to a friend.",
          knowledge_base: [
            {
              type: 'file',
              name: knowledgeBase.id,
              id: knowledgeBase.id,
            },
          ],
          knowledge_base_document_ids: [knowledgeBase.id],
        },
      },
    },
  });

  const { data, error } = await supabase.from("instances").insert({
    name: payload.name,
    description: payload.description ?? null,
    sources: payload.sources,
    user_uid: user.id,
    conversational_agent_id: agent.agent_id,
    knowledge_base_id: knowledgeBase.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/dashboard");
}
