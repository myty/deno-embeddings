import ollama from "ollama";
import ora from "ora";
import { MODELS } from "../models.ts";
import { getChromaClient } from "../chroma.ts";

export const prompt = async (prompt: string) => {
  const client = await getChromaClient();
  const spinner = ora(`Prompt: "${prompt}"`).start();

  const collection = await client.getOrCreateCollection({
    name: "docs",
  });

  const embeddingsResponse = await ollama.embeddings({
    prompt,
    model: MODELS.embed,
  });

  const results = await collection.query({
    queryEmbeddings: [embeddingsResponse["embedding"]],
    nResults: 1,
  });

  const data = results["documents"][0][0];

  const { response: promptResponse } = await ollama.generate({
    model: MODELS.generate,
    prompt: `Using this data: ${data}. Respond to this prompt: ${prompt}`,
  });

  spinner.stop();

  console.log(promptResponse);
};
