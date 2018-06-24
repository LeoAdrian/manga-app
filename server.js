const app = require('express')();
const mysql = require('mysql');
const cors = require('cors'); app.use(cors());
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host     : 'webit-ps.com',
  user     : 'webitpsc_manga',
  password : '12345678',
  database : 'webitpsc_manga'
});

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
connection.connect();

app.get('/search', (req, res) => {
  console.log(req.query);
  const { term } = req.query;
  connection.query(`SELECT title AS t, alias AS a, image_url AS im, hits AS h, status AS s, manga_id AS i FROM allmanga WHERE title LIKE "%${term}%"`, (err, result) => {
    if(err) throw err;
    return res.json(result);
  })
})

app.get('/manga', (req, res) => {
  const {id} = req.query;
  // const filteredQ = `SELECT am.id, am.title, gd.name from allmanga AS am JOIN genre_relation AS mr ON mr.manga_id = am.id JOIN genre_desc as gd ON mr.genre_id = gd.id HAVING gd.name!='ecchi' AND gd.name!='adult' LIMIT ${limit};`
  connection.query(`SELECT title AS t, alias AS a, image_url AS im, hits AS h, status AS s, manga_id AS i FROM allmanga WHERE i=${id}`, (err, result) => {
    if(err) throw err;
    console.log(result);
    return res.json(result);
  })
})

app.get('/popular', (req, res) => {
  const {limit} = req.params;
  // const filteredQ = `SELECT am.id, am.title, gd.name from allmanga AS am JOIN genre_relation AS mr ON mr.manga_id = am.id JOIN genre_desc as gd ON mr.genre_id = gd.id HAVING gd.name!='ecchi' AND gd.name!='adult' LIMIT ${limit};`
  connection.query(`SELECT title AS t, alias AS a, image_url AS im, hits AS h, status AS s, manga_id AS i FROM allmanga ORDER BY hits DESC LIMIT 15`, (err, result) => {
    if(err) throw err;
    return res.json(result);
  })
})


// connection.end();
app.listen(process.env.PORT || 8000, () => {
  console.log('Listening on port ' + process.env.PORT || 8000)
})
