const mysql      = require('mysql');
const fetch      =  require('node-fetch');
const _ = require('lodash');


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'manga'
});

const getManga = (r) => {
  return fetch(`https://www.mangaeden.com/api/list/0/`)
         .then(response => response.json())
         .then(manga => r(manga))
}

const allMangaPromise = new Promise((resolve, reject) => {
  return getManga(resolve)
})

const insertAllQ = `INSERT INTO allmanga (title, alias, image_url, hits, status, manga_id, latest_chapter_date) VALUES ?`;
const insertGenresDesc = `INSERT INTO genres_desc (name) VALUES ?`;
const insertGenresRel = `INSERT INTO genre_relation(manga_id, genre_id) VALUES ?`;


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
// .then(mangaArr  => {
//   // const m = _.sortBy(mangaArr, [function(o) { return o.a }]);
//
//   // mangaArr.forEach((manga, index) => {
//   //   if(index === 10) {
//   //     console.log('=========Found manga================');
//   //     console.log(manga);
//   //   }
//   //   // console.log(manga);
//   // })
//   return m;
// })


// INSERT all manga ;
// .then((mangaArr) => {
//   const allManga = [];
//   mangaArr.forEach((obj, i) => {
//     let formatDate = unixToDate(obj.ld);
//     allManga.push([obj.t, obj.a, obj.im, obj.h, obj.s, obj.i, formatDate]);
//   })
//   return allManga;
// })
// .then( allManga => {
//   connection.connect();
//   connection.query(insertAllQ, [allManga], function(err, result){
//     if (err) throw err;
//     console.log(result);
//   })
// })
// .then(() => connection.end())
// Populate array of genres global variable
.then(mangaArr => {
  const tempArr = [];
  // For every manga in the list
  mangaArr.forEach(manga => {
    // Get the array of each manga in the API
    // console.log(manga.c);
      manga.c.forEach(genre => {
        // See if genre is already in the array
        // if not push it
        // if it is, move on
        if (!_.includes(tempArr, genre)) {
          tempArr.push(genre);
        }
      })
  })
  //Sort genres alphabetically
  genreArr = [..._.sortBy(tempArr, [0])];
  console.log('Finished pushing genres');
  return {
    genres: genreArr,
    allManga: mangaArr
  };
})
.then((mangaAndGenres) => {
  const genreRel = [];
  const {genres, allManga} = mangaAndGenres;
  // console.log(allManga);
  // console.log(genres);
  // console.log(allManga);
  // console.log(_.reduce(allManga, (result, manga, index) => {
  //   if(_.isEmpty(manga)) {
  //     result.push(true);
  //   }
  //   return result;
  //   },[]));
  allManga.forEach((manga,index) => {
    // Array that will store paris for all genres
    const genreA = [];
    if(_.isEmpty(manga.c)){
      // console.log(`Index: ${index} | length: ${genreA.length}`)
      genreRel.push([index, null]);
    }
    manga.c.forEach(g => {
      // Create array to hold pairs of index of manga and
      // the index of every genre it has
      const genA = [];
      // console.log(index);
      // console.log(`Genre(${index}: ${g} | IndexOf : ${genres.indexOf(g)}`);
      genA.push(index + 1, genres.indexOf(g) + 1);
      genreRel.push(genA);
    })
    // If manga doesn't have genres insert null

      // Push
        // genreRel.push(genreA);

  })
  return genreRel;
})
.then(genreRel => {
  // console.log(genreRel);
  // console.log(genreRel.length);

  connection.connect();
  connection.query(insertGenresRel, [genreRel], function(err, result) {
    if (err) throw err;
    console.log(result);
  })
})
.then( () => connection.end())





// Insert into genres_desc table
// .then(tempArr => {
//   connection.connect();
//   connection.query(insertGenresDesc, [tempArr], function(err, result){
//     if (err) throw err;
//     console.log(result);
//   })
//   connection.end()
//   // console.log(tempArr);
// }
// )
// .then(() => {})
// allMangaPromise
// .then(manga => {
//   for(let i = 0; i < 10; i++){
//     console.log(manga.manga[i].ld);
//   }
// });


// Create table containing all manga---------------------
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
// Insert all manga in its table----------------
// .then(mangaArr => {
//
//     connection.query(insertAllQ, [mangaArr], function (error, result) {
//       if (error) throw error;
//       console.log(result);
//     });
// })
// .then(() => {
//   connection.end();
// })
