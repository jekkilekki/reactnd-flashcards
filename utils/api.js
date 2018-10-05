/* UdaciFitness API */
import { AsyncStorage } from 'react-native'
// import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'
/* Chirper Redux example */
import { decks, cards, _getDecks, _getCards, _saveDeck, _saveToDeck } from './_DATA.js'

const DECK_STORAGE_KEY = '@KBH:Decks'
const CARD_STORAGE_KEY = '@KBH:Cards'

export function getInitialData() {
  return Promise.all([
    _getDecks(),
    _getCards(),
  ]).then(([decks, cards]) => ({
    decks, 
    cards
  }))
}

/* Async Flashcards */
/* Decks */
export function newDeckToStorage({ deck, key }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck,
  }))
}

export function removeDeckFromStorage(key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

/* Cards */
export function newCardToStorage({ card, key }) {
  return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
    [key]: card,
  }))
}

export function removeCardFromStorage(key) {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data))
    })
}

/* UdaciFitness API */
// export function fetchCalendarResults () {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then(formatCalendarResults)
// }

// export function submitEntry ({ entry, key }) {
//   return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }

// export function removeEntry (key) {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })
// }