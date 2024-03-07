import dotenv from "dotenv";

dotenv.config();

export const Environment = {
  infrastructure: {
    server: {
      port: Number(process.env.SERVER_PORT),
    },
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      name: process.env.DB_NAME,
    },
  },
};
