import "jsr:@std/dotenv/load";

export const MODELS = {
  embed: Deno.env.get("MODELS_EMBED") ?? "znbang/bge:small-zh-v1.5-f16",
  generate: Deno.env.get("MODELS_GENERATE") ?? "llama3.1",
};
