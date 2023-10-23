const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors());

const db = new sqlite3.Database('db.sql');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS user (username TEXT UNIQUE, password TEXT)');
})

app.get('/', (req, res) => {
  db.all('SELECT * FROM user', [], (err, rows) => {
    res.status(200).json(rows);
  });
})


app.use(express.json());

app.post('/create', (req, res) => {
  const body = req.body;
  console.log(body)
  db.exec(`INSERT INTO user(username, password) VALUES ('${body.username}', '${body.password}')`);
  res.status(201).json({ message: 'User created' })
})

app.listen('3000', () => {
  console.log('Hello, World')
})