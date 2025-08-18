import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000, // <-- use connectTimeout instead of timeout
})

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
    console.log("[v0] Database connection successful")
    return true
  } catch (error) {
    console.error("[v0] Database connection failed:", error)
    return false
  }
}

export default pool
