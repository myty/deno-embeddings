import { ChromaClient } from "chromadb";

export async function getChromaClient() {
  const client = new ChromaClient();

  while (true) {
    try {
      const heartbeat = await client.heartbeat();
      console.log("Connected to ChromaDB");

      if (heartbeat > 0) {
        return client;
      }
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
