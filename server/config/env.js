import dotenv from "dotenv";
dotenv.config();

const config = {
  dev: {
    db: process.env.DB_URI,
    port: process.env.PORT || 3000,
    jwt_key: process.env.JWT_KEY || "abcde12345",
    log: "bug",
  },
};

const stage = process.env.STAGE || "dev";

export default config[stage];
