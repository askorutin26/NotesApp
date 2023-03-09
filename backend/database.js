import * as pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();
const { Pool } = pg.default;

const connectionString = process.env.DB_STRING;

const pool = new Pool({
  connectionString,
});

export default pool;
