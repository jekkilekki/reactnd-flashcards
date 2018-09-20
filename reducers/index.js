import { decks, cards } from '../utils/_DATA'
import { RECEIVE_CARDS,
  ADD_CARD, EDIT_CARD, DELETE_CARD,
  SELECT_DECK, NO_SELECTED_DECK, 
  ADD_DECK, EDIT_DECK, DELETE_DECK, 
} from '../actions'

const initialState = {
  decks,
  deckView: false,
  deckSelected: null,
  cards
}

export default (state = initialState, action) => {
  switch ( action.type ) {
    case SELECT_DECK:
      return {
        ...state,
        deckView: true,
        deckSelected: action.payload
      }
    case NO_SELECTED_DECK:
      return {
        ...state,
        deckView: false,
        deckSelected: null
      }
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