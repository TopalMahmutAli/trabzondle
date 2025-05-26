const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à PostgreSQL
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

// Route test
app.get("/", (req, res) => {
  res.send("Trabzondle API is running 🎉");
});

// Route test base de données
app.get("/joueurs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Joueurs");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération des joueurs");
  }
});

// 💡 Route GET pour récupérer tous les joueurs
app.get('/joueurs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM joueurs');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
