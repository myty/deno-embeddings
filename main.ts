import { Command } from "cliffy";
import { embed } from "./commands/embed.ts";

await new Command()
  .name("vector-vault")
  .version("0.1.0")
  .description("CLI commands for Vector Vault")
  .command("embed", "Embed sub-command.")
  .arguments("<path:string>")
  .action(async (_options, ...args) => {
    await embed(args[0]);
  })
  .parse(Deno.args);

// const prompt = "Where were llamas first domesticated?";
// // const prompt = "What animals are llamas related to?";

// console.log("Prompt:", prompt);

// const response = await ollama.embeddings({
//   prompt,
//   model: "mxbai-embed-large",
// });

// const results = await collection.query({
//   queryEmbeddings: [response["embedding"]],
//   nResults: 1,
// });

// const data = results["documents"][0][0];

// console.log("Data:", data);

// const output = await ollama.generate({
//   model: "llama3.1",
//   prompt: `Using this data: ${data}. Respond to this prompt: ${prompt}`,
// });

// console.log("Output:", output["response"]);
