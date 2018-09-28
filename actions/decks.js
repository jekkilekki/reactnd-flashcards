// import { decks } from '../utils/_DATA'

export const FETCH_DECKS = 'FETCH_DECKS'
export const SORT_CARDS = 'SORT_CARDS'
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
export function sortCards( cards, decks ) {
  return {
    type: SORT_CARDS,
    decks
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