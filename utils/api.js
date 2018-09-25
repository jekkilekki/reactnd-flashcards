/* UdaciFitness API */
import { AsyncStorage } from 'react-native'
import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'
/* Chirper Redux example */
import { _getDecks, _getCards, _saveDeck, _saveToDeck } from './_DATA.js'

/* UdaciFitness API */
export function fetchCalendarResults () {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
}

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeEntry (key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}

/* Chirper Redux example */
// export function getInitialData() {
//   return Promise.all([
//     _getDecks(),
//     _getCards(),
//   ]).then(([decks, cards]) => ({
//     decks,
//     cards,
//   }))
// }

// export function saveDeck(info) {
//   return _saveDeck(info)
// }

// export function saveToDeck(info) {
//   return _saveToDeck(info)
// }