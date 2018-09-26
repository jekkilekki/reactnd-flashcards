import { generateUID } from '../utils/helpers'
import { decks } from '../utils/_DATA'

export const FETCH_DECKS = 'FETCH_DECKS'
export const NEW_DECK = 'NEW_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const EDIT_DECK = 'EDIT_DECK'
export const DELETE_DECK = 'DELETE_DECK'

// Fetch decks
export function fetchDecks() {
  return {
    type: FETCH_DECKS,
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

export function handleNewDeck( name, description, image ) {
  return ( dispatch, getState ) => {
    // const { authedUser } = getState()

    const formattedDeck = formatDeck({ name, description, image })

    // return saveNewDeck({
    //   name,
    //   description,
    //   image,
    //   // author: authedUser
    // }).then((deck) => {
      dispatch( newDeck( formattedDeck ))
    // }).catch((e) => {
    //   console.warn('Error in saving Deck: ', e)
    //   alert('Error saving your deck. Please try again.')
    // })
  }
}

function saveNewDeck( deck ) {
  // const { decks } = this.getState()
  const formattedDeck = formatDeck(deck)

  return {
    formattedDeck
  }
}

function formatDeck({ name, description, image }) {
  return {
    id: generateUID(),
    name,
    description,
    image,
    cards: []
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