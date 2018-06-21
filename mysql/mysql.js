const mysql      = require('mysql');
const fetch      =  require('node-fetch');
const _ = require('lodash');

const getManga = (r) => {
  return fetch(`https://www.mangaeden.com/api/list/0/`)
         .then(response => response.json())
         .then(manga => r(manga))
}

const allMangaPromise = new Promise((resolve, reject) => {
  return getManga(resolve)
})

const insertQ = `INSERT INTO allmanga (title, alias, image_url, hits, status, manga_id, latest_chapter_date) VALUES ?`

function unixToDate(code) {
  if(!code){
    return null;
  }
  const d       = new Date(code * 1000);
  const year    =  d.getFullYear();
  const month   = '0' + (d.getMonth() + 1);
  const day     = '0' + d.getDate();
  const seconds = '0' + d.getSeconds();
  const minutes = '0' + d.getMinutes();
  const hours   = '0' + d.getHours();

  return `${year}-${month.substr(-2)}-${day.substr(-2)} ${hours.substr(-2)}:${minutes.substr(-2)}:${seconds.substr(-2)}`
}

let genreArr = [];

allMangaPromise
.then(mangaObj => {
  return mangaObj.manga;
})
.then(mangaArr => {
  const tempArr = [];
  mangaArr.forEach(manga => {
      manga.c.forEach(genre => {
        if(!_.includes(tempArr, genre)){
          tempArr.push(genre)
        }
      })
  })
  //Sort genres alphabetically
  genreArr = [..._.sortBy(tempArr, [0])];
  console.log('Finished pushing genres');
})
.then(() => console.log(genreArr));
// allMangaPromise
// .then(manga => {
//   for(let i = 0; i < 10; i++){
//     console.log(manga.manga[i].ld);
//   }
// });

// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database : 'manga'
// });
//
// connection.connect();
//
// connection.query(`SELECT COUNT(*) AS Count FROM allmanga`, function(error, result){
//   if(error) throw error;
//   if(!result[0].Count) {
//     console.log('Create');
//   } else {
//     console.log('Update');
//   }
//   // console.log(result.Count)
// })
//
// connection.end();

// allMangaPromise
// .then((allm) =>{
//   return allm.manga.map( mangaObj => {
//     let formatDate = unixToDate(mangaObj.ld);
//     return [mangaObj.t, mangaObj.a, mangaObj.im, mangaObj.h, mangaObj.s, mangaObj.i, formatDate];
//   })
// }
// )
// .then(mangaArr => {
//
//     connection.query(insertQ, [mangaArr], function (error, result) {
//       if (error) throw error;
//       console.log(result);
//     });
// })
// .then(() => {
//   connection.end();
// })
