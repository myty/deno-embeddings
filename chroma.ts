import { ChromaClient } from "chromadb";

export async function getChromaClient() {
  const client = new ChromaClient();

  while (true) {
    try {
      const heartbeat = await client.heartbeat();
      if (heartbeat > 0) {
        return client;
      }
    } catch {
      console.warn("Chroma connection error, retrying in 1 second...");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
