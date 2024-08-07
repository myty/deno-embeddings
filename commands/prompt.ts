import ollama from "ollama";
import { MODELS } from "../models.ts";
import { getChromaClient } from "../chroma.ts";

export const prompt = async (prompt: string) => {
  const client = await getChromaClient();

  const collection = await client.getOrCreateCollection({
    name: "docs",
  });

  const response = await ollama.embeddings({
    prompt,
    model: MODELS.embed,
  });

  const results = await collection.query({
    queryEmbeddings: [response["embedding"]],
    nResults: 1,
  });

  const data = results["documents"][0][0];

  console.log(`Using this data: ${data}. Respond to this prompt: ${prompt}`);

  const output = await ollama.generate({
    model: MODELS.generate,
    prompt: `Using this data: ${data}. Respond to this prompt: ${prompt}`,
  });

  return output["response"];
};
