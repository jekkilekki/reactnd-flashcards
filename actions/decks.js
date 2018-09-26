export const FETCH_DECKS = 'FETCH_DECKS'
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

// Add deck
export function newDeck( name, description, image ) {
  return {
    type: NEW_DECK,
    name,
    description,
    image
  }
}

// Add card to deck
export function addCardToDeck( cardId, deckId ) {
  return {
    type: ADD_CARD_TO_DECK,
    cardId,
    deckId
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