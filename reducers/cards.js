import { cards } from '../utils/_DATA'
import { FETCH_CARDS, NEW_CARD, EDIT_CARD, DELETE_CARD } from '../actions/cards'

const initialState = {
  cards,
}

export default (state = initialState, action) => {
  switch ( action.type ) {
    // case INITIAL_DATA:
    //   return {
    //     ...state,
    //     cards: action.payload,
    //     // cards: action.payload
    //   }
    
    case NEW_CARD:
      return {
        ...state,
        cards: [...state.cards, action.card]
      }

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
//   ADD_CARD,
//   EDIT_CARD,
//   DELETE_CARD
// } from '../actions'

// function cards ( state = {}, action ) {
//   switch (action.type) {
//     case RECEIVE_CARDS:
//       return {
//         ...state,
//         ...action.cards,
//       }
//     case ADD_CARD:
//       return {
//         ...state,
//         ...action.card,
//       }
//     case EDIT_CARD:
//       return state
//     case DELETE_CARD:
//       return state
//     default:
//       return state
//   }
// }

// export default cards