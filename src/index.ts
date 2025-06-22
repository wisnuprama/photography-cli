import { program } from "./core.js";
import { buildRemoveUnselectedImg } from "./remove-unselected-img/index.js";

main();

// This function can be used to register commands or perform initial setup
function main() {
  buildRemoveUnselectedImg(program);

  program.parse(process.argv);
}
