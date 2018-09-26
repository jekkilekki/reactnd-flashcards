import { combineReducers } from 'redux'
import authedUser from './authedUser'
import decks from './decks'
import cards from './cards'

export default combineReducers({
  authedUser,
  decks,
  cards
})