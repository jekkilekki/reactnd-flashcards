export const SET_CARDS = 'SET_CARDS'
export const NEW_CARD = 'NEW_CARD'
export const EDIT_CARD = 'EDIT_CARD'
export const DELETE_CARD = 'DELETE_CARD'

// Set cards
export function setCards( cards ) {
  return {
    type: SET_CARDS,
    cards
  }
}

export function handleSetCards( cards ) {
  // Do we need to pull out the card ID for object key on each element of cards array here?
  return (dispatch) => {
    dispatch( setCards(cards))
  }
}

// Add card
function newCard( card ) {
  return {
    type: NEW_CARD,
    card
  }
}

export function handleNewCard( id, korean, english, image, partOfSpeech, sentences ) {
  return async ( dispatch, getState ) => {
    const formattedCard = formatCard({ id, korean, english, image, partOfSpeech, sentences })
    await dispatch( newCard( formattedCard ))
    await dispatch( setCards( getState().cards ))
  }
}

function formatCard({ id, korean, english, image, partOfSpeech, sentences }) {
  return {
    id,
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