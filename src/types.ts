import { Command } from "commander";

export type CommandRegisterBuild<T = any> = (
  program: Command,
  params?: T
) => void;
