import * as pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();
const { Pool } = pg.default;

const connectionString =
  "postgresql://postgres:5xvbBZ7tDoemW7Kn9xUF@containers-us-west-104.railway.app:7985/railway";

const pool = new Pool({
  connectionString,
});

export default pool;
