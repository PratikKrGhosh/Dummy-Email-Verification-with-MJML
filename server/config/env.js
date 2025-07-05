import dotenv from "dotenv";
dotenv.config();

const config = {
  dev: {
    db: process.env.DB_URI,
    port: process.env.PORT || 3000,
    jwt_key: process.env.JWT_KEY || "abcde12345",
    root: process.env.ROOT || "http://127.0.0.1",
    rootUri:
      `${process.env.ROOT}:${process.env.PORT}` ||
      `http://127.0.0.1:${process.env.PORT}` ||
      "http://127.0.0.1:3000",
    log: "bug",
  },
  test: {
    db: process.env.DB_URI,
    port: process.env.PORT || 3000,
    jwt_key: process.env.JWT_KEY || "abcde12345",
    root: process.env.ROOT || "http://127.0.0.1",
    rootUri:
      `${process.env.ROOT}:${process.env.PORT}` ||
      `http://127.0.0.1:${process.env.PORT}` ||
      "http://127.0.0.1:3000",
    log: "info",
  },
  production: {
    db: process.env.DB_URI,
    port: process.env.PORT || 3000,
    jwt_key: process.env.JWT_KEY || "abcde12345",
    root: process.env.ROOT || "http://127.0.0.1",
    rootUri:
      `${process.env.ROOT}:${process.env.PORT}` ||
      `http://127.0.0.1:${process.env.PORT}` ||
      "http://127.0.0.1:3000",
    log: "error",
  },
};

const stage = process.env.STAGE || "dev";

export default config[stage];
