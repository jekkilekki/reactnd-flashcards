import { generateUID } from '../utils/helpers'
import { cards } from '../utils/_DATA'

export const FETCH_CARDS = 'FETCH_CARDS'
export const NEW_CARD = 'NEW_CARD'
export const EDIT_CARD = 'EDIT_CARD'
export const DELETE_CARD = 'DELETE_CARD'

// Fetch cards
export function fetchCards() {
  return {
    type: FETCH_CARDS,
    cards
  }
}

// Add card
function newCard( card ) {
  return {
    type: NEW_CARD,
    card
  }
}

export function handleNewCard( korean, english, image, partOfSpeech, sentences ) {
  return (dispatch, getState) => {
    const formattedCard = formatCard({ korean, english, image, partOfSpeech, sentences })
    dispatch( newCard( formattedCard ))
  }
}

function formatCard({ korean, english, image, partOfSpeech, sentences }) {
  return {
    id: generateUID(),
    korean,
    english,
    image,
    partOfSpeech,
    sentences: []
  }
}

// Edit card
export function editCard( cardId, korean, english, image, partOfSpeech, sentences ) {
  return {
    type: EDIT_CARD,
    cardId,
    korean,
    english,
    image,
    partOfSpeech,
    sentences
  }
}

// Delete card
export function deleteCard( cardId ) {
  return {
    type: DELETE_CARD,
    cardId
  }
}