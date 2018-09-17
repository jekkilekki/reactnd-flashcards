import { decks } from '../utils/_DATA'

const initialState = {
  decks
}

export default (state = initialState, action) => {
  switch ( action.type ) {
    default: 
      return state
  }
}

// import { RECEIVE_CARDS,
//   ADD_DECK,ADD_CARD,
//   EDIT_DECK, EDIT_CARD,
//   DELETE_DECK, DELETE_CARD
// } from '../actions'

// function cards ( state = {}, action ) {
//   switch (action.type) {
//     case RECEIVE_CARDS:
//       return {
//         ...state,
//         ...action.cards,
//       }
//     case ADD_DECK:
//       return {
//         ...state,
//         ...action.deck,
//       }
//     case ADD_CARD:
//       return {
//         ...state,
//         ...action.card,
//       }
//     case EDIT_DECK:
//       return state
//     case EDIT_CARD:
//       return state
//     case DELETE_DECK:
//       return state
//     case DELETE_CARD:
//       return state
//     default:
//       return state
//   }
// }

// export default cards