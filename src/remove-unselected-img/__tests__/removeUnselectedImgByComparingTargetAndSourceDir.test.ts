import { removeUnselectedImgByComparingTargetAndSourceDir } from "../removeUnselectedImgByComparingTargetAndSourceDir.js";
import fs from "fs-extra";
import inquirer from "inquirer";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

const targetDir = "__test_target__";
const sourceDir = "__test_source__";

beforeEach(() => {
  fs.ensureDirSync(targetDir);
  fs.writeFileSync(`${targetDir}/a.ARW`, "");
  fs.writeFileSync(`${targetDir}/a.jpg`, "");
  fs.writeFileSync(`${targetDir}/a.xmp`, "");
  fs.writeFileSync(`${targetDir}/b.ARW`, "");
  fs.writeFileSync(`${targetDir}/b.jpg`, "");

  fs.writeFileSync(`${targetDir}/c.jpg`, "");
  fs.writeFileSync(`${targetDir}/c.xmp`, "");
  fs.writeFileSync(`${targetDir}/c.ARW`, "");

  fs.ensureDirSync(sourceDir);
  fs.writeFileSync(`${sourceDir}/a.jpg`, "");
  fs.writeFileSync(`${sourceDir}/b.jpg`, "");
});

afterEach(() => {
  fs.removeSync(targetDir);
  fs.removeSync(sourceDir);
});

it("removes files in targetDir that are not in sourceDir", async () => {
  vi.spyOn(inquirer, "prompt").mockResolvedValueOnce({ shouldRemove: true });
  await removeUnselectedImgByComparingTargetAndSourceDir(targetDir, sourceDir);
  const files = fs.readdirSync(targetDir);
  expect(files).toEqual(
    expect.arrayContaining(["a.jpg", "a.ARW", "a.xmp", "b.jpg", "b.ARW"])
  );
  expect(files).not.toContain("c.jpg");
  expect(files).not.toContain("c.ARW");
  expect(files).not.toContain("c.xmp");
});

it("does not remove files if user cancels", async () => {
  vi.spyOn(inquirer, "prompt").mockResolvedValueOnce({ shouldRemove: false });
  await removeUnselectedImgByComparingTargetAndSourceDir(targetDir, sourceDir);
  const files = fs.readdirSync(targetDir);
  expect(files).toEqual(
    expect.arrayContaining([
      "a.ARW",
      "a.jpg",
      "b.ARW",
      "b.jpg",
      "c.jpg",
      "c.xmp",
      "c.ARW",
    ])
  );
});
