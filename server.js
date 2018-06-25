const app = require('express')();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());

const connection = mysql.createConnection({
  host     : 'webit-ps.com',
  user     : 'webitpsc_manga',
  password : '12345678',
  database : 'webitpsc_manga'
});

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
// connection.connect();

app.get('/search', (req, res) => {
  const { term, limit } = req.query;
  let sqlQuery = `SELECT title AS t, alias AS a, image_url AS im, hits AS h, status AS s, manga_id AS i FROM allmanga WHERE title LIKE "${term}%" `;
  if(limit) {
    sqlQuery += `LIMIT ${limit}`
  }
  console.log(limit);
  console.log(sqlQuery);
  connection.query(sqlQuery, (error, result) => {
    if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
        return res.json(result);
      }
  })
})

app.get('/popular', (req, res) => {
  const {limit} = req.params;
  // const filteredQ = `SELECT am.id, am.title, gd.name from allmanga AS am JOIN genre_relation AS mr ON mr.manga_id = am.id JOIN genre_desc as gd ON mr.genre_id = gd.id HAVING gd.name!='ecchi' AND gd.name!='adult' LIMIT ${limit};`
  connection.query(`SELECT title AS t, alias AS a, image_url AS im, hits AS h, status AS s, manga_id AS i FROM allmanga ORDER BY hits DESC LIMIT 15`, (error, result) => {
    if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
        return res.json(result);
      }
  })
})


app.listen(process.env.PORT || 8000 , function() {
  console.log('Listening on port 8000')
});
