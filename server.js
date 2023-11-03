const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
// Configurer les en-têtes CORS pour autoriser uniquement votre adresse IP locale
app.use(cors({
  origin: ['http://192.168.1.18:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configuration du pare-feu (Firewall)
// Exemple : Bloquer toutes les connexions sauf celles provenant de l'adresse IP 192.168.0.100
app.use((req, res, next) => {
  const clientIp = req.ip;
  if (clientIp !== '192.168.0.100') {
    res.status(403).json({ error: 'Accès non autorisé' });
  } else {
    next();
  }
});

const db = new sqlite3.Database('db.sql');

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )
`;

db.serialize(() => {
  db.run(createTableQuery, (error) => {
    if (error) {
      console.error('Erreur lors de la création de la table :', error.message);
    } else {
      console.log('Table créée avec succès');

      const insertDataQuery = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
      `;

      const usersData = [
        ['john', 'password123'],
        ['jane', 'password456']
      ];

      const insertStatement = db.prepare(insertDataQuery);

      usersData.forEach(userData => {
        insertStatement.run(userData, (error) => {
          if (error) {
            console.error("Erreur lors de l'insertion des données :", error.message);
          } else {
            console.log('Données insérées avec succès');
          }
        });
      });

      insertStatement.finalize();
    }
  });
});

app.get('/users', (req, res) => {
  const selectDataQuery = 'SELECT * FROM users';

  db.all(selectDataQuery, (error, rows) => {
    if (error) {
      console.error('Erreur lors de la sélection des données :', error.message);
      res.status(500).json({ error: 'Erreur lors de la sélection des données' });
    } else {
      res.json(rows);
    }
  });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const deleteDataQuery = 'DELETE FROM users WHERE id = ?';

  db.run(deleteDataQuery, id, (error) => {
    if (error) {
      console.error('Erreur lors de la suppression des données :', error.message);
      res.status(500).json({ error: 'Erreur lors de la suppression des données' });
    } else {
      res.status(200).json({ message: "Les utilisateurs ont été effacés de la table USERS." });
      console.log("Les utilisateurs ont été effacés de la table USERS.");
    }
  });
});

app.get("/titi/:name", (req, res) => {
  const name = req.params.name;

  // Le name sera enregistré dans la BDD.
  console.log(name);
  res.json({ prenom: name });
});

app.post("/toto", (req, res) => {
  console.log(req.body);
  // console.log(req.hostname);
  // console.log(req.body);
  // console.log(req.headers);
  res.json(req.body);
});

app.listen(3000, () => {
  console.log('API is running on port 3000');
});