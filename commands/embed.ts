import * as fs from "node:fs";
import * as path from "node:path";
import ollama from "ollama";
import { MODELS } from "../models.ts";
import { getChromaClient } from "../chroma.ts";

export const embed = async (path: string) => {
  const client = await getChromaClient();
  const collection = await client.getOrCreateCollection({
    name: "docs",
  });

  for (const document of getDocumentsFromPath(path)) {
    console.log(`Embedding document: ${document.path}`);

    const { embedding } = await ollama.embeddings({
      model: MODELS.embed,
      prompt: document.body,
    });

    collection.upsert({
      ids: [document.path],
      embeddings: [embedding],
      documents: [document.body],
      metadatas: {
        path: document.path,
      },
    });
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
