import { getInitialData } from '../utils/api'
import { fetchDecks } from '../actions/decks'
import { fetchCards } from '../actions/cards'
import { setAuthUser } from '../actions/authedUser'
// import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'jekkilekki'

export function handleInitialData() {
  return dispatch => {
    // dispatch(showLoading())
    return getInitialData().then(({ decks, cards }) => {
      dispatch(fetchDecks(decks))
      dispatch(fetchCards(cards))
      dispatch(setAuthUser(AUTHED_ID))
      // dispatch(hideLoading())
    })
  }
}