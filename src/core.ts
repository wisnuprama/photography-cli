import { Command } from "commander";

const program = new Command();

program
  .name("my-script")
  .description("Personal script for various tasks")
  .version("1.0.0");

export { program };
