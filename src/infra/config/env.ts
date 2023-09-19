import dotenv from "dotenv";

dotenv.config();

export const Environment = {
  infrastructure: {
    server: {
      port: Number(process.env.SERVER_PORT),
    },
  },
};
