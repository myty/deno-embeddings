import postgres from "postgres";
import config from "../config.ts";

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: config.APP_DB_NAME,
  user: config.APP_DB_USER,
  password: config.APP_DB_PASS,
});

export default sql;
