import { SET_CARDS, NEW_CARD, EDIT_CARD, DELETE_CARD } from '../actions/cards'
import { AsyncStorage } from 'react-native'

export default (state = {}, action) => {
  switch ( action.type ) {

    case SET_CARDS:
      // save cards in AsyncStorage
      if ( action.cards ) {
        AsyncStorage.setItem( 'KBH:Cards', JSON.stringify(action.cards) )
          console.log('Sorted cards saved to storage.', action.cards)
      }
      return {
        ...state,
        ...action.cards
      }
    
    case NEW_CARD:
      const { card } = action
      return {
        ...state,
        [card.id]: card
      }

    default: 
      return state
  }
}