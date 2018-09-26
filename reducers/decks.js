import { decks } from '../utils/_DATA'
import { FETCH_DECKS, NEW_DECK, ADD_CARD_TO_DECK, EDIT_DECK, DELETE_DECK } from '../actions/decks'

const initialState = {
  decks,
  // deckView: false,
  // deckSelected: null,
  // deckImg: '',
  // deckName: '',
  // deckDesc: '',
  // deckCards: [],
  // loadingDecks: false 
}

export default decks = (state = initialState, action) => {
  switch ( action.type ) {
    // case INITIAL_DATA:
    //   return {
    //     ...state,
    //     decks: action.payload,
    //     // cards: action.payload
    //   }

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

    case FORM_UPDATE: 
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      }

    case NEW_DECK:
      return {
        ...state,
        deckImg: '',
        deckName: '',
        deckDesc: '',
        deckCards: []
      }

    case ADD_DECK_FIRE:
      return {
        ...state,
        ...action.newDeck
      }

    default: 
      return state
  }
}

// import { 
//   ADD_DECK,
//   EDIT_DECK, 
//   DELETE_DECK,
// } from '../actions'

// function decks ( state = {}, action ) {
//   switch (action.type) {
//     case RECEIVE_DECKS:
//       return {
//         ...state,
//         ...action.decks,
//       }
//     case ADD_DECK:
//       return {
//         ...state,
//         ...action.deck,
//       }
//     case EDIT_DECK:
//       return state
//     case DELETE_DECK:
//       return state
//     default:
//       return state
//   }
// }

// export default decks