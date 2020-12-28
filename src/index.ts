import Robot from './Robot';
import Board from './Board';
import Command from './Command';
import * as readline from 'readline';
import CommandProcessor from './CommandProcessor';

const board = new Board();
const robot = new Robot(board);
const commandProcessor = new CommandProcessor();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export const executeCommand = (CommandSInput: string, robot: Robot): void => {
  try {
    const robotCommand: Command | undefined = commandProcessor.parseCommand(CommandSInput);
    if (robotCommand) {
      robot.run(robotCommand);
    }
  } catch (error) {
    console.error(error.message);
  }
};
export const main = (readline: readline.Interface): void => {
  readline.question(`Please enter a Robot command or type quit to exit the program?\n`, (input) => {
    if (input.trim().toLowerCase() === 'quit') {
      readline.close();
    } else {
      executeCommand(input, robot);
      main(readline);
    }
  });
};
main(rl);
