import { FETCH_MANGA, FETCH_DETAILS, FETCH_CHAPTER, FETCH_POPULAR, SEARCH_TERM } from '../actions/types';

const initialState = {
  listManga     : {},
  mangaDetails  : {},
  chapter       : {},
  popular       : [],
  searched        : []
}

export default function(state = initialState, action) {
  switch( action.type ){
    case FETCH_MANGA :
      return {
        ...state,
        listManga : action.payload
      }
    case FETCH_DETAILS :
      return {
        ...state,
        mangaDetails : action.payload
      }
    case FETCH_CHAPTER :
      return {
        ...state,
        chapter : action.payload
        }
    case FETCH_POPULAR :
      return {
        ...state,
        popular : action.payload
          }
    case SEARCH_TERM :
      return {
        ...state,
        searched : action.payload
          }
    default :
      return state;
  }
}

// const initialState = {
//   listManga: {}
// }
//
// export default function (state = initialState, action) {
//   switch(action.type){
//     case 'FETCH_MANGA':
//       return {
//         ...state,
//         listManga: action.payload
//       }
//       break;
//     default:
//       return state;
//   }
//
// }
