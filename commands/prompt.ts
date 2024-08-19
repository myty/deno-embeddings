import ollama from "ollama";
import ora from "ora";
import { MODELS } from "../models.ts";
import sql from "../data/db.ts";

async function getDocumentsFromEmbedding(
  embedding: number[],
  take: number = 5,
): Promise<{ path: string; body: string }[]> {
  const embeddingValues = `[${embedding.join(",")}]`;

  const results = await sql`
    SELECT *
    FROM docs
    ORDER BY embedding <-> ${embeddingValues}
    LIMIT ${take};
  `;

  const documents = results.map((result) => ({
    path: result.id,
    body: result.body,
  }));

  return documents;
}

export const prompt = async (prompt: string) => {
  const spinner = ora(`Prompt: "${prompt}"`).start();

  const { embedding } = await ollama.embeddings({
    prompt,
    model: MODELS.embed,
  });

  const [result] = await getDocumentsFromEmbedding(embedding);
  const { path, body } = result;

  const { response: promptResponse } = await ollama.generate({
    model: MODELS.generate,
    prompt:
      `Begin your response with "Based on '${path}'" and using this data: ${body}, respond to this prompt: ${prompt}`,
  });

  spinner.stop();

  console.log(promptResponse);
};
