import inquirer from "inquirer";
import { CommandRegisterBuild } from "../types.js";
import { Log } from "../logger.js";

import fs from "fs-extra";

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
            message: "Enter the directory to scan for unselected images",
          },
        ]);

        return runRemoveUnselectedImgByComparingTargetDirAndSourceDir(
          targetDir,
          sourceDir
        );
      }
    });
};

export async function runRemoveUnselectedImgByComparingTargetDirAndSourceDir(
  targetDir: string,
  sourceDir: string
) {
  // Implement the logic to compare targetDir and sourceDir
  // and remove unselected images from targetDir
  Log.info(`Comparing ${targetDir} with ${sourceDir}...`);

  const sourceFiles = fs.readdirSync(sourceDir);
  Log.info(
    `Found ${sourceFiles.length} files in source directory. Ingoring dupicates from different extensions...`
  );

  const sourceFileNames = new Set(sourceFiles.map((file) => file));
  Log.info(`Source file names: ${Array.from(sourceFileNames).join(", ")}`);

  const { shouldRemove } = await inquirer.prompt([
    {
      type: "confirm",
      name: "shouldRemove",
      message: "Continue to remove unselected images?",
    },
  ]);

  if(!shouldRemove) {
    Log.info("Operation cancelled by user.");
    return;
  }

  const targetFiles = fs.readdirSync(targetDir);
  Log.info(`Found ${targetFiles.length} files in target directory.`);
  const unselectedFiles = targetFiles.filter(
    (file) => !sourceFileNames.has(file)
  );
  Log.info(
    `Found ${unselectedFiles.length} unselected files to remove: ${unselectedFiles.join(", ")}`
  );
  unselectedFiles.forEach((file) => {
    const filePath = `${targetDir}/${file}`;
    fs.removeSync(filePath);
    Log.info(`Removed unselected image: ${filePath}`);
  });

  Log.info("Unselected images removed successfully.");
}
