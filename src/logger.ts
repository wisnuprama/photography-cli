import chalk from 'chalk';

export const Log = {
  info: (...args: unknown[]) => {
    console.log(chalk.green('[INFO]'), ...args);
  },
  warn: (...args: unknown[]) => {
    console.warn(chalk.yellow('[WARN]'), ...args);
  },
  debug: (...args: unknown[]) => {
    console.debug(chalk.magenta('[DEBUG]'), ...args);
  },
  error: (...args: unknown[]) => {
    console.error(chalk.red('[ERROR]'), ...args);
  },
} as const;
