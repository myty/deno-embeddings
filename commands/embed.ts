import * as fs from "node:fs";
import * as path from "node:path";
import ollama from "ollama";
import { MODELS } from "../models.ts";
import sql from "../data/db.ts";

async function saveDocumentEmbeddings(
  path: string,
  body: string,
  embedding: number[],
) {
  const embeddingValues = `[${embedding.join(",")}]`;

  await sql`
    INSERT INTO docs (id, embedding, body) VALUES (${path}, ${embeddingValues}, ${body})
    ON CONFLICT (id) DO UPDATE SET embedding = EXCLUDED.embedding;`;
}

export const embed = async (path: string) => {
  for (const document of getDocumentsFromPath(path)) {
    console.log(`Embedding document: ${document.path}`);

    const { embedding } = await ollama.embeddings({
      model: MODELS.embed,
      prompt: document.body,
    });

    saveDocumentEmbeddings(document.path, document.body, embedding);
  }
};

function getDocumentsFromPath(path: string): { path: string; body: string }[] {
  const filePaths = recursiveReadDirSync(path);

  return filePaths.map((filePath) => {
    const body = fs.readFileSync(filePath, "utf-8");
    return {
      path: filePath,
      body,
    };
  });
}

function recursiveReadDirSync(dirPath: string): string[] {
  let results: string[] = [];

  const list = fs.readdirSync(dirPath);
  list.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(recursiveReadDirSync(filePath));
    } else {
      results.push(filePath);
    }
  });

  return results;
}
