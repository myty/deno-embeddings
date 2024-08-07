import "jsr:@std/dotenv/load";

export const MODELS = {
  embed: Deno.env.get("MODELS_EMBED") ?? "mxbai-embed-large",
  generate: Deno.env.get("MODELS_GENERATE") ?? "llama3.1",
};
