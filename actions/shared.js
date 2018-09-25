import { getInitialData } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import { receiveCards } from '../actions/cards'
import { setAuthUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'jekkilekki'

export function handleInitialData() {
  return dispatch => {
    // dispatch(showLoading())
    return getInitialData().then(({ decks, cards }) => {
      dispatch(receiveDecks(decks))
      dispatch(receiveCards(cards))
      dispatch(setAuthUser(AUTHED_ID))
      // dispatch(hideLoading())
    })
  }
}