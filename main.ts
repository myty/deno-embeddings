import { Command } from "cliffy/command";
import { embed } from "./commands/embed.ts";
import { prompt } from "./commands/prompt.ts";

await new Command()
  .name("vector-vault")
  .version("0.1.0")
  .description("CLI commands for Vector Vault")
  .command("embed", "Embed sub-command.")
  .arguments("<path:string>")
  .action((_options, ...args) => embed(args[0]))
  .command("prompt", "Prompt sub-command.")
  .arguments("<path:string>")
  .action((_options, ...args) => prompt(args[0]))
  .parse(Deno.args);
