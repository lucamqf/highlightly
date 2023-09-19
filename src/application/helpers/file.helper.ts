import fs from "fs";
import path from "path";

export function mapProjectFiles(directory: string): string[] {
  const files = [];

  fs.readdirSync(directory).forEach((file) => {
    const absolute = path.join(directory, file);

    if (fs.statSync(absolute).isDirectory()) {
      files.push(...mapProjectFiles(absolute));
    } else {
      files.push(absolute);
    }
  });

  return files;
}
