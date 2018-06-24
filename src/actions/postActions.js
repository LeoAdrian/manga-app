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


export const fetchChapter = ( mID, chID ) => dispatch => {
  return fetch(`https://www.mangaeden.com/api/chapter/${mID}/`)
          .then(response => response.json())
          .then(chapter => dispatch({
            type    : FETCH_CHAPTER,
            payload : chapter
        }))
}

export const fetchPopular = () => dispatch => {
  return fetch(`http://localhost:8000/popular`)
        .then(response => response.json())
        .then(popular => dispatch({
          type    : FETCH_POPULAR,
          payload : popular
        }))
}

export const searchManga = (searchTerm ,callback) => dispatch => {
  return fetch(`http://localhost:8000/search?term=${searchTerm}`)
        .then(response => response.json())
        .then(results => dispatch({
          type    : SEARCH_TERM,
          payload : results,
          search: true
        }))
        .then( () => callback())
}
