import { getInitialData } from '../utils/api'
import { fetchDecks, sortCards } from '../actions/decks'
import { fetchCards } from '../actions/cards'
import { setAuthUser } from '../actions/authedUser'
// import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = null

export function handleInitialData() {
  return dispatch => {
    return getInitialData()
      .then(({ decks, cards }) => {
        dispatch( fetchDecks(decks) )
        dispatch( fetchCards(cards) )
        // dispatch( sortCards(cards, decks) )
        dispatch( setAuthUser(AUTHED_ID) )
      })
  }
}