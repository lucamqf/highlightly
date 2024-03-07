import path from "path";
import { DataSource } from "typeorm";
import { Environment } from "../env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: Environment.infrastructure.database.host,
  port: Number(Environment.infrastructure.database.port),
  username: Environment.infrastructure.database.user,
  password: Environment.infrastructure.database.pass,
  database: Environment.infrastructure.database.name,
  entities: [
    `${path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "contexts",
      "**",
      "external",
      "entities",
      "*.{ts,js}",
    )}`,
  ],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
});
