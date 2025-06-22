import inquirer from "inquirer";
import { CommandRegisterBuild } from "../types.js";

import { removeUnselectedImgByComparingTargetAndSourceDir } from "./removeUnselectedImgByComparingTargetAndSourceDir.js";

export const buildRemoveUnselectedImg: CommandRegisterBuild = (program) => {
  program
    .command("remove-unselected-img")
    .description("Remove unselected images from the selected folder")
    .argument("<targetDir>", "Directory to scan for unselected images")
    .action(async (targetDir) => {
      const { source } = await inquirer.prompt([
        {
          type: "select",
          name: "source",
          message: "Select a source of selected images",
          choices: ["Directory"],
        },
      ]);

      if (source === "Directory") {
        const { sourceDir } = await inquirer.prompt([
          {
            type: "input",
            name: "sourceDir",
            message: "Enter the directory to scan for the selected images",
          },
        ]);

        return removeUnselectedImgByComparingTargetAndSourceDir(
          targetDir,
          sourceDir
        );
      }
    });
};
