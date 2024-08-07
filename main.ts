import { Command } from "cliffy/command";
import { embed } from "./commands/embed.ts";
import { prompt } from "./commands/prompt.ts";

await new Command()
  .version("0.1.0")
  .command("embed")
  .arguments("<folder-path:string>")
  .action((_options, ...args) => embed(args[0]))
  .command("prompt")
  .arguments("<folder-path:string>")
  .action((_options, ...args) => prompt(args[0]))
  .parse(Deno.args);
