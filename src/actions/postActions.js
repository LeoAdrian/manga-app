import { FETCH_MANGA, FETCH_DETAILS, FETCH_CHAPTER, FETCH_POPULAR, SEARCH_TERM } from './types';
import {isEmpty, isNull} from 'lodash'
export const fetchManga = (nr = 5) => dispatch => {
  return fetch(`https://www.mangaeden.com/api/list/0/?p=${nr}&l=25`)
         .then(response => response.json())
         .then(manga => dispatch({
           type     : FETCH_MANGA,
           payload  : manga
         }))
}

export const fetchDetails = (id) => dispatch => {
  console.log('Into fetch');
  return fetch(`https://www.mangaeden.com/api/manga/${id}/`)
          .then(r => r.ok ? r.json() : null)
          .then(d => {


            return  { details: d, isOk: !isNull(d) }
          })
          .then(({isOk, details}) => dispatch({
            type    : FETCH_DETAILS,
            payload : {
              details,
              isOk
            }
        }))
}

// export const fetchDetails = ( obj ) => dispatch => {
//   console.log('Into fetch');
//   console.log(obj);
//   return fetch(`http://localhost:8000/search?id=${obj.i}/`)
//           .then(response => response.json())
//           .then(details => dispatch({
//             type    : FETCH_DETAILS,
//             payload : details
//         }))
// }

export const fetchChapter = ( mID, chID ) => dispatch => {
  return fetch(`https://www.mangaeden.com/api/chapter/${mID}/`)
          .then(response => response.json())
          .then(chapter => dispatch({
            type    : FETCH_CHAPTER,
            payload : chapter
        }))
}

export const fetchPopular = (limit) => dispatch => {
  return fetch(`https://manga-server.herokuapp.com/popular&limit=${limit}`)
        .then(response => response.json())
        .then(popular => dispatch({
          type    : FETCH_POPULAR,
          payload : popular
        }))
}

export const searchManga = (searchTerm ,callback) => dispatch => {
  return fetch(`https://manga-server.herokuapp.com/search?term=${searchTerm}`)
        .then(response => response.json())
        .then(results => dispatch({
          type    : SEARCH_TERM,
          payload : results,
          search: true
        }))
        .then( () => callback())
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
