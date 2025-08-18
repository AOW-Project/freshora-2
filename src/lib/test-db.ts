import pool from "./db";

(async () => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    console.log("DB connected:", rows);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();
