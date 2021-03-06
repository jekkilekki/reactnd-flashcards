import { decks, cards } from '../utils/_DATA'
import { INITIAL_DATA, FORM_UPDATE, RECEIVE_CARDS,
  NEW_CARD, ADD_CARD, EDIT_CARD, DELETE_CARD,
  SELECT_DECK, NO_SELECTED_DECK, 
  NEW_DECK, ADD_DECK, EDIT_DECK, DELETE_DECK, 
  ADD_DECK_FIRE, ADD_CARD_FIRE
} from '../actions'

const initialState = {
  authedUser = null,
  defaultDecks: decks,
  userDecks: [],
  cards,
  // deckView: false,
  // deckSelected: null,
  deckImg: '',
  deckName: '',
  deckDesc: '',
  deckCards: [],
  loadingDecks: false 
}

export default reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case SET_AUTHED_USER:
      return action.uid

    // case INITIAL_DATA:
    //   return {
    //     ...state,
    //     userDecks: action.payload,
    //     // cards: action.payload
    //   }

    // case SELECT_DECK:
    //   return {
    //     ...state,
    //     deckView: true,
    //     deckSelected: action.payload
    //   }

    // case NO_SELECTED_DECK:
    //   return {
    //     ...state,
    //     deckView: false,
    //     deckSelected: null
    //   }

    // case FORM_UPDATE: 
    //   return {
    //     ...state,
    //     [action.payload.prop]: action.payload.value
    //   }

    case NEW_DECK:
      return {
        ...state,
        deckImg: '',
        deckName: '',
        deckDesc: '',
        // deckCards: []
      }

    // case ADD_DECK_FIRE:
    //   return {
    //     ...state,
    //     ...action.newDeck
    //   }

    case DELETE_DECK:
      return {
        ...state
      }
    
    case NEW_CARD:
      return initialState

    // case ADD_CARD_FIRE:
    //   return {
    //     ...state,
    //     ...action.newCard
    //   }

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