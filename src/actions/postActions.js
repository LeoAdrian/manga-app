import { FETCH_MANGA, FETCH_DETAILS } from './types';

export const fetchManga = () => dispatch => {
  return fetch('https://www.mangaeden.com/api/list/0/?p=1&l=25')
         .then(response => response.json())
         .then(manga => dispatch({
           type     : FETCH_MANGA,
           payload  : manga
         }))
}

export const fetchDetails = ( obj ) => dispatch => {
  return fetch(`https://www.mangaeden.com/api/manga/${obj.i}/`)
          .then(response => response.json())
          .then(details => dispatch({
            type    : FETCH_DETAILS,
            payload : details
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
