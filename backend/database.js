import * as pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();
const { Pool } = pg.default;

const connectionString =
  "postgresql://postgres:oP0z3RiooSWLOLoLQiSF@containers-us-west-104.railway.app:7985/railway";

const pool = new Pool({
  connectionString,
});

export default pool;
