const unixToDate = (code) => {
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

const allMangaPromise = (f) => {
  return new Promise((resolve,reject) => {
    f(`https://www.mangaeden.com/api/list/0/`)
           .then(response => response.json())
           .then(manga => resolve(manga))
           .catch(err => console.log(err))
  })
}

const formatAllFunc = (mangaList, dateF, formatStr) => {
  const allManga = [];
   mangaList.forEach((obj, i) => {
     let formatDate = dateF(obj.ld);
     allManga.push([formatStr(obj.t), formatStr(obj.a), obj.im, obj.h, obj.s, obj.i, formatDate]);
   })
   return allManga;
}

const formatDetail = (mangaList, dateF, formatStr, idx) => {
  const allManga = [];

   mangaList.forEach((obj, i) => {
       // idx+=1
     let formatDate = dateF(obj.ld);
     allManga.push([idx++, formatStr(obj.title), formatStr(obj.alias),obj.author, obj.artist, obj.chapters_len, dateF(obj.created), formatStr(obj.description), dateF(obj.last_chapter_date),obj.image, obj.imageURL, obj.language, obj.released, obj.startsWith,
       obj.status, obj.type]);
   })
   return allManga;
}

const getAllGenres = (mangaList, lo) => {
  const tempArr = [];
  // For every manga in the list
  mangaList.forEach(manga => {
    // Get the array of each manga in the API
    // console.log(manga.c);
      manga.c.forEach(genre => {
        // See if genre is already in the array
        // if not push it
        // if it is, move on
        if (!lo.includes(tempArr, genre)) {
          tempArr.push(genre);
        }
      })
  })
  //Sort genres alphabetically
  genreArr = [...lo.sortBy(tempArr, [0])];
  console.log('Finished pushing genres');
  return {
    genres: genreArr,
    allManga: mangaList
  };
}

const getGenresForManga = (mangaGenresObj, lo) => {
  const genreRel = [];
  const {genres, allManga} = mangaGenresObj;
  allManga.forEach((manga,index) => {
    // Array that will store paris for all genres
    const genreA = [];
    if(lo.isEmpty(manga.c)){
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
}

module.exports = {
  unixToDate : unixToDate,
  allMangaPromise : allMangaPromise,
  formatAllFunc   : formatAllFunc,
  getAllGenres    : getAllGenres,
  getGenresForManga : getGenresForManga,
  formatDetail: formatDetail
}
