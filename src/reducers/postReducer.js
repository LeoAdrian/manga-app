import { FETCH_MANGA, FETCH_DETAILS, FETCH_CHAPTER } from '../actions/types';

const initialState = {
  listManga     : {},
  mangaDetails  : {},
  chapter       : {}
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
