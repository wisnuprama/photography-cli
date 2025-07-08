import chalk from 'chalk';

const getDateTime = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const date = `${yyyy}${mm}${dd}`;
  const time = now.toLocaleTimeString([], { hour12: false });
  return `${date}/${time}`;
};

export const Log = {
  info: (...args: unknown[]) => {
    console.log(`${chalk.gray(`[${getDateTime()}]`)}${chalk.green(`[INFO]`)}`, ...args);
  },
  warn: (...args: unknown[]) => {
    console.warn(`${chalk.gray(`[${getDateTime()}]`)}${chalk.yellow('[WARN]')}`, ...args);
  },
  debug: (...args: unknown[]) => {
    console.debug(`${chalk.gray(`[${getDateTime()}]`)}${chalk.magenta('[DEBUG]')}`, ...args);
  },
  error: (...args: unknown[]) => {
    console.error(`${chalk.gray(`[${getDateTime()}]`)}${chalk.red('[ERROR]')}`, ...args);
  },
} as const;
