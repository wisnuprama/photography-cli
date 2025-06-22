import inquirer from "inquirer";
import { Log } from "../logger.js";

import fs from "fs-extra";
import path from "path";

export async function removeUnselectedImgByComparingTargetAndSourceDir(
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

  const targetFiles = fs.readdirSync(targetDir);
  Log.info(`Found ${targetFiles.length} files in target directory.`);
  const unselectedFiles = targetFiles.filter(
    (file) => !sourceFileNames.has(file)
  );
  Log.info(
    `Found ${
      unselectedFiles.length
    } unselected files to remove: ${unselectedFiles.join(", ")}`
  );

  const { shouldRemove } = await inquirer.prompt([
    {
      type: "confirm",
      name: "shouldRemove",
      message: "Continue to remove unselected images?",
    },
  ]);

  if (!shouldRemove) {
    Log.info("Operation cancelled by user.");
    return;
  }

  unselectedFiles.forEach((file) => {
    const filePath = path.join(targetDir, file);
    fs.removeSync(filePath);
    Log.info(`Removed unselected image: ${filePath}`);
  });

  Log.info("Unselected images removed successfully.");
}
