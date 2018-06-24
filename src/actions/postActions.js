import { FETCH_MANGA, FETCH_DETAILS, FETCH_CHAPTER, FETCH_POPULAR, SEARCH_TERM } from './types';

export const fetchManga = (nr = 1) => dispatch => {
  return fetch(`https://www.mangaeden.com/api/list/0/?p=${nr}&l=25`)
         .then(response => response.json())
         .then(manga => dispatch({
           type     : FETCH_MANGA,
           payload  : manga
         }))
}

export const fetchDetails = ( obj ) => dispatch => {
  console.log('Into fetch');
  console.log(obj);
  return fetch(`https://www.mangaeden.com/api/manga/${obj.i || obj.manga_id}/`)
          .then(response => response.json())
          .then(details => dispatch({
            type    : FETCH_DETAILS,
            payload : details
        }))
}

export const fetchChapter = ( mID, chID ) => dispatch => {
  return fetch(`https://www.mangaeden.com/api/chapter/${mID}/`)
          .then(response => response.json())
          .then(chapter => dispatch({
            type    : FETCH_CHAPTER,
            payload : chapter
        }))
}

export const fetchPopular = (limit) => dispatch => {
  return fetch(`http://localhost:8000/popular&limit=${limit}`)
        .then(response => response.json())
        .then(popular => dispatch({
          type    : FETCH_POPULAR,
          payload : popular
        }))
}

export const searchManga = (searchTerm) => dispatch => {
  console.log('Fetch manga for: ' + searchTerm);
  return fetch(`http://localhost:8000/search&q=${searchTerm}`)
        .then(response => response.json())
        .then(results => dispatch({
          type    : SEARCH_TERM,
          payload : results
        }))
}
// export const fetchManga = () => dispatch => {
//   console.log('Fetching manga');
//   fetch("https://www.mangaeden.com/api/list/0/?p=1&l=25")
//     .then(result => result.json())
//     .then(manga => dispatch({
//       type    : FETCH_MANGA,
//       payload : manga
//     }));
// }
