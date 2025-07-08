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
    `Found ${sourceFiles.length} files in source directory. Ingoring duplicates from different extensions...`
  );

  Log.info(`Source file names: ${sourceFiles.join(", ")}`);

  const selectedFiles = processSourceFiles(sourceFiles);

  Log.info(`Selected file names: ${Array.from(selectedFiles).join(", ")}`);

  const targetFiles = fs.readdirSync(targetDir);
  Log.info(`Found ${targetFiles.length} files in target directory.`);
  const unselectedFiles = targetFiles.filter(
    (file) => !selectedFiles.has(file)
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

function processSourceFiles(fileNames: string[]): Set<string> {
  // Define the image file extensions to be considered for removal and to be kept.
  // This list only includes extensions used by the same image (e.g, "A7C123123.ARW" and "A7C123123.jpg").
  // This can be extended as needed
  // Note: The extensions are case-sensitive, so ensure they match the actual file names.
  const imgExtensions = [
    ".jpg",
    ".jpeg",
    ".heic",
    ".heif",
    ".ARW",
    ".tiff",
    ".dng",
    ".xmp",
  ];

  // Process file names to remove duplicates based on the base name
  const processedNames = new Set<string>();

  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    processedNames.add(fileName);

    const baseName = fileName.split(".")[0];
    for (let j = 0; j < imgExtensions.length; j++) {
      const ext = imgExtensions[j];
      const relatedFileName = `${baseName}${ext}`;
      if (fileName === relatedFileName) {
        continue; // Skip if the file name already matches the extension
      }
      // Add the related file name with the specific extension
      processedNames.add(relatedFileName);
    }
  }

  return processedNames;
}
