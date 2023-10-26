

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const cors = require('cors'); 
const db = new sqlite3.Database('db.sql');
// const db = new sqlite3.Database(':memory:');

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
        VALUES ('john', 'password123'),
               ('jane', 'password456')
      `;

      db.run(insertDataQuery, (error) => {
        if (error) {
          console.error('Erreur lors de l\'insertion des données :', error.message);
        } else {
          console.log('Données insérées avec succès');
        }
      });
    }
  });
});

app.use(cors()); 
app.use(express.json()); 

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

app.get("/titi/:name", (req, res) => {
  let name = req.params.name; 

  // le name tu va enregitrer dans la BDD. 
  console.log(name);  
  res.json({prenom: name}); 
});

app.post("/toto", (req, res) => {
  console.log(req.ip); 
  console.log(req.hostname); 
  console.log(req.body);
  console.log(req.headers); 
  res.json(req.body); 
})

app.listen(3000, () => {
  console.log('API is running on port 3000');
});

