import { FETCH_MANGA, FETCH_DETAILS, FETCH_CHAPTER } from './types';

export const fetchManga = (nr = 1) => dispatch => {
  return fetch(`https://www.mangaeden.com/api/list/0/?p=${nr}&l=25`)
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

export const fetchChapter = ( mID, chID ) => dispatch => {
  console.log('Fetch Chapter');
  console.log(mID);
  return fetch(`https://www.mangaeden.com/api/chapter/${mID}/`)
          .then(response => response.json())
          .then(chapter => dispatch({
            type    : FETCH_CHAPTER,
            payload : chapter
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
