// import { decks } from '../utils/_DATA'

export const FETCH_DECKS = 'FETCH_DECKS'
export const SORT_DECKS = 'SORT_DECKS'
export const NEW_DECK = 'NEW_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const EDIT_DECK = 'EDIT_DECK'
export const DELETE_DECK = 'DELETE_DECK'

// Fetch decks
export function fetchDecks( decks ) {
  return {
    type: FETCH_DECKS,
    decks
  }
}

// Sort Cards into Decks
function sortDecks( decks ) {
  return {
    type: SORT_DECKS,
    decks
  }
}

export function handleSortDecks( decks, cards ) {
  return ( dispatch ) => {
    // Delete anything undefined from decks
    Object.keys(decks).forEach(key => decks[key] === undefined && delete decks[key])

    // Turn objects into arrays for easier sorting - maybe easier?
    const deckArray = Object.keys(decks).map(i => decks[i])
    const cardArray = Object.keys(cards).map(i => cards[i])

    // Sort cards into a new array of arrays
    let sortedDecks = deckArray.map((deck) => {
      return cardArray.filter((card) => {
        if (deck.level === card.level) {
          return card.id
        }
      })
    })

    // Place the sorted cards into their respective decks
    Object.keys(decks).forEach((key, i) => {
      return decks[key].cards = sortedDecks[i]
    })

    // Dispatch the sort function to save to Redux state 
    dispatch( sortDecks(decks) )
  }
}

// Add deck
function newDeck( deck ) {
  return {
    type: NEW_DECK,
    deck
  }
}

export function handleNewDeck( id, name, description, image ) {
  return ( dispatch ) => {
    const formattedDeck = formatDeck({ id, name, description, image })
    dispatch( newDeck( formattedDeck ))
  }
}

function formatDeck({ id, name, description, image }) {
  return {
    id,
    name,
    description,
    image,
    cards: []
  }
}

// Add card to deck
export function addCardToDeck( deckId, card ) {
  return {
    type: ADD_CARD_TO_DECK,
    deckId,
    card
  }
}

// Edit deck
export function editDeck( deckId, name, description, image ) {
  return {
    type: EDIT_DECK,
    deckId,
    name,
    description,
    image
  }
}

// Delete deck
export function deleteDeck( deckId ) {
  return {
    type: DELETE_DECK,
    deckId
  }
}