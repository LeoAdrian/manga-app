const mysql      = require('mysql');
const fetch      = require('node-fetch');
const _          = require('lodash');
const { INSERTALLQ, INSERTGENRESREL, INSERTGENRESDESC, INSERTINTOMDETAILS } = require('./utils/constants');
const { unixToDate,
  allMangaPromise,
  formatAllFunc,
  getAllGenres,
  getGenresForManga,
  formatDetail } = require('./utils/utils_func');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  database : 'manga'
});

function createPromise(manga, f, index) {
  return new Promise ((resolve, reject) => {
    fetch(`https://www.mangaeden.com/api/manga/${manga.i}`)
     .then(response => response.json())
     // .then(data => resolve(data))
     .then(data => resolve(f(data, unixToDate, _.unescape, index, 'single')))
     .catch(err => console.log(err));
  })
}

const start = 17500;
const limit = null;

allMangaPromise(fetch)
.then(mangaObj => {
  return _.sortBy(mangaObj.manga, [ manga => manga.t]);
})

// INSERT MANGA DETAILS IN A TABLE AND LINK IT TO ALLMANGA TABLE
.then(mangaO => {
  const all = [];
  let length = limit || mangaO.length;
  // for(let i = start; i < length; i++){
  //   all.push(createPromise(mangaO[i]));
  // }
  const reducedArr = mangaO.reduce((container, manga, index) => {
    if(index > 19640){
      // return container;
      container.push(createPromise(manga,formatDetail, index+1));
    } else {
      return container;
    }
    return container;
  }, [])
  return Promise.all(reducedArr)
})
.then(result => console.log(result))
// .then(mangaDetails => formatDetail(mangaDetails, unixToDate, _.unescape, start + 1))
// .then(formattedArr => {
//   connection.connect();
//     connection.query(INSERTINTOMDETAILS, [formattedArr], (err, result) => {
//       if(err) throw err;
//       console.log(result);
//     })
//     connection.end()
// })
.catch(err => console.log(err))



// MAP EVERY MANGA TO ALL ITS GENRES
// .then(mangaArr => {
//   return getAllGenres(mangaArr, _);
// })
// .then(mangaAndGenres => {
//   return getGenresForManga(mangaAndGenres, _);
// })
// .then(genres => {
//   connection.connect();
//   connection.query(INSERTGENRESREL, [genres], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   })
// })




// INSERT ALL MANGA INTO SQL TABLE
// .then(mangaArr => {
//   return formatAllFunc(mangaArr, unixToDate, _.unescape);
// })
// .then(formattedArr => {
//   connection.connect();
//   connection.query(INSERTALLQ, [formattedArr], (err, result) => {
//     if(err) throw err;
//     console.log(result);
//   })
// connection.end();
// });



// Populate array of genres global variable and insert all genres into genre_desc table
// .then(mangaArr => {
//   return getAllGenres(mangaArr, _);
// })
// .then(tempArr => {
//   connection.connect();
//   connection.query(INSERTGENRESDESC, [_.chunk(tempArr.genres)], function(err, result){
//     if (err) throw err;
//     console.log(result);
//   })
//   // console.log(_.chunk(tempArr.genres));
// }
// )
// .then( () => connection.end);
