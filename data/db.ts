import postgres from "postgres";
import config from "../config.ts";

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: config.POSTGRES_DB,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
});

export default sql;
