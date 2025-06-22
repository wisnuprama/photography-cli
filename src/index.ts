import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';

const program = new Command();

program
  .name('my-script')
  .description('A sample CLI using commander, chalk, and inquirer')
  .version('1.0.0');

program
  .command('greet')
  .description('Greet a user')
  .action(async () => {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
    ]);
    console.log(chalk.green(`Hello, ${name}!`));
  });

program.parse(process.argv);

// Entry point for your TypeScript scripts
console.log('Hello from TypeScript!');
