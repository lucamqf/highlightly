import { Express } from "express";
import { SOURCE_FOLDER } from "src/application/constants/path";
import { mapProjectFiles } from "src/application/helpers/file.helper";

function mapRoutes(): string[] {
  const files = mapProjectFiles(SOURCE_FOLDER);

  return files.filter(
    (file) =>
      file.includes(".route.ts") ||
      (file.includes(".route.js") && !file.includes(".route.js.map")),
  );
}

export default (app: Express): void => {
  const routes = mapRoutes();

  routes.map(async (route) => {
    if (route.includes(".test.")) return;

    (await import(route)).default(app);
  });
};
