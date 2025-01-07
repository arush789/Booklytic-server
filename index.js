const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3001;
dotenv.config();
app.use(cors());
app.use(express.json());

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/test", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT brand FROM cars WHERE brand = 'Ford'"
    );
    client.release();
    console.log("Data:", result.rows);

    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/add-data", async (req, res) => {
  const client = await pool.connect();
  await client.query(
    "INSERT INTO cars (brand, model, year) VALUES ('BMW', 'M8', '1999')"
  );
  client.release();
});

app.listen(port, () => {
  console.log("Server started at", port);
});
