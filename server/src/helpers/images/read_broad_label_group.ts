import fs from "fs";
import path from "path";
import { dirname } from "path/posix";
import { fileURLToPath } from "url";
import { BROAD_LABEL_GROUP_FILE_PATH } from "../constants/constants";

interface Categories {
  [key: string]: string[];
}

export const readBroadLabelGroup = (): Categories => {
  const categories: Categories = {};
  let currentCategory: string | null = null;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = path.resolve(__dirname, BROAD_LABEL_GROUP_FILE_PATH);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  for (let line of lines) {
    line = line.trim();
    if (!line) {
      continue;
    }
    if (line.startsWith("*") && line.endsWith("*")) {
      currentCategory = line.slice(1, -1);
      categories[currentCategory] = [];
    } else if (currentCategory !== null) {
      categories[currentCategory].push(line);
    }
  }

  return categories;
};
