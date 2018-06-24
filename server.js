const app = require('express')();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  database : 'manga'
});

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.use(cors());
connection.connect();

app.get('/search&q=:searchTerm', (req, res) => {
  const { searchTerm } = req.params;
  connection.query(`SELECT title AS t, alias AS a, image_url AS im, hits AS h, status AS s, manga_id AS i FROM allmanga WHERE title LIKE "%${searchTerm}%"`, (err, result) => {
    if(err) throw err;
    res.json(result);
  })
})

app.get('/popular&limit=:limit', (req, res) => {
  const {limit} = req.params;
  // const filteredQ = `SELECT am.id, am.title, gd.name from allmanga AS am JOIN genre_relation AS mr ON mr.manga_id = am.id JOIN genre_desc as gd ON mr.genre_id = gd.id HAVING gd.name!='ecchi' AND gd.name!='adult' LIMIT ${limit};`
  connection.query(`SELECT * FROM allmanga ORDER BY hits DESC LIMIT ${limit}`, (err, result) => {
    if(err) throw err;
    res.json(result);
  })
  // res.send(req.params);
})

// connection.end();
app.listen(8000, () => {
  console.log('Listening on port 8000')
})
