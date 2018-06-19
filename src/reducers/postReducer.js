import { FETCH_MANGA, FETCH_DETAILS } from '../actions/types';

const initialState = {
  listManga     : {},
  mangaDetails  : {}
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
          mangaDetails  :  action.payload
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
