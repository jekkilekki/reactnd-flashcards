import { FETCH_CARDS, NEW_CARD, EDIT_CARD, DELETE_CARD } from '../actions/cards'

export default (state = {}, action) => {
  switch ( action.type ) {
    case FETCH_CARDS:
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