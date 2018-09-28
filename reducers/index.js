import { combineReducers } from 'redux'
import authedUser from './authedUser'
import decks from './decks'
import cards from './cards'

const reducer = combineReducers({
  authedUser,
  decks: decks,
  cards: cards,
})

export default reducer