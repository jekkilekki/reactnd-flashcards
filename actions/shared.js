import { getInitialData } from '../utils/api'
import { setDecks, handleSortDecks } from '../actions/decks'
import { setCards } from '../actions/cards'
import { setAuthUser } from '../actions/authedUser'
// import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = null

export function handleInitialData() {
  return dispatch => {
    return getInitialData()
      .then(({ decks, cards }) => {
        dispatch( setDecks(decks) )
        dispatch( setCards(cards) )
        // dispatch( setAuthUser(AUTHED_ID) )
        dispatch( handleSortDecks( decks, cards ))
      })
  }
}