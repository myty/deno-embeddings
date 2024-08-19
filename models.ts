import config from "./config.ts";

export const MODELS = {
  embed: config.MODELS_EMBED ?? "znbang/bge:small-zh-v1.5-f16",
  generate: config.MODELS_GENERATE ?? "llama3.1",
};
