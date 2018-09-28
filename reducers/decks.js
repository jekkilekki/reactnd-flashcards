import { decks } from '../utils/_DATA'
import { FETCH_DECKS, NEW_DECK, ADD_CARD_TO_DECK, EDIT_DECK, DELETE_DECK } from '../actions/decks'
import { AsyncStorage } from 'react-native'

const initialState = {
  decks,
}

export default (state = initialState, action) => {
  switch ( action.type ) {
    case FETCH_DECKS:
      return {
        ...state,
        ...action.decks
      }

    case NEW_DECK:
      // save new deck in AsyncStorage
      // if ( action.deck ) {
      //   AsyncStorage.setItem('decks', [...state.decks, action.deck])
      // }
      const { deck } = action
      return {
        ...state,
        [decks]: {
          ...state.decks,
          [deck.id]: deck
        }
      }

    case ADD_CARD_TO_DECK:
      const { deckId, card } = action
      return {
        ...state.decks,
        [deckId]: {
          ...state[decks.deckId],
          cards: [...state.cards, card]
        }
      }

    default: 
      return state
  }
}