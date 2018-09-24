import firebase from 'firebase'

export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const SELECT_CARD = 'SELECT_CARD'
export const ADD_CARD = 'ADD_CARD'
export const EDIT_CARD = 'EDIT_CARD'
export const DELETE_CARD = 'DELETE_CARD'

export const SELECT_DECK = 'SELECT_DECK'
export const NO_SELECTED_DECK = 'NO_SELECTED_DECK'
export const ADD_DECK = 'ADD_DECK'
export const EDIT_DECK = 'EDIT_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export const FORM_UPDATE = 'FORM_UPDATE'
export const NEW_DECK = 'NEW_DECK'
export const NEW_CARD = 'NEW_CARD'
export const ADD_DECK_FIRE = 'ADD_DECK_FIRE'
export const ADD_CARD_FIRE = 'ADD_CARD_FIRE'

export function selectDeck( deckId ) {
  return {
    type: SELECT_DECK,
    payload: deckId,
  }
}

export function noSelectedDeck() {
  return {
    type: NO_SELECTED_DECK
  }
}

export function formUpdate({ prop, value }) {
  return {
    type: FORM_UPDATE,
    payload: { prop, value }
  }
}

/**
 * FIREBASE ACTIONS
 */
export function addDeckFire({deckImg, deckName, deckDesc, deckCards}) {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/decks`)
      .push({deckImg, deckName, deckDesc, deckCards})
      .then(() => {
        dispatch({ type: NEW_DECK })
      })
  }
}

export function loadInitialData() {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/decks`)
      .on('value', snapshot => {
        dispatch({ type: INITIAL_DATA, payload: snapshot.val() })
      })
  }
}

/*
 * Receive Cards
 */
export function receiveCards( cards ) {
  return {
    type: RECEIVE_CARDS,
    cards
  }
}

/*
 * Add Deck
 */
function addDeck( deck ) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function handleAddDeck( title ) {
  return ( dispatch ) => {
    dispatch( showLoading() )
    return saveDeckTitle({
      title
    })
    .then((deck) => {
      dispatch( addDeck( deck ))
    })
    .then(() => dispatch( hideLoading() ))
    .catch((e) => {
      console.warn( "Error in saving DECK: ", e )
      alert( "There was an error saving the DECK. Please try again." )
    })
  }
}

/*
 * Add Card
 */
function addCard( card ) {
  return {
    type: ADD_CARD,
    card
  }
}

export function handleAddCard( title, front, back ) {
  return ( dispatch ) => {
    dispatch( showLoading() )
    return addCardToDeck({
      front,
      back,
      deck: title
    })
    .then((card) => {
      dispatch( addCard( card ))
    })
    .then(() => dispatch( hideLoading() ))
    .catch((e) => {
      console.warn( "Error in saving CARD: ", e )
      alert( "There was an error saving the CARD. Please try again." )
    })
  }
}

/*---------------------------------------------------
 >>> Optional Functionality (not yet implemented)
---------------------------------------------------*/
/*
 * Edit Deck
 */
function editDeck( deck ) {
  return {
    type: EDIT_DECK,
    deck
  }
}

export function handleEditDeck( id ) {
  return ( dispatch ) => {
    console.log( "Editing your DECK: ", id )
    .then(() => dispatch( editDeck( id ) ))
  }
}

/*
 * Edit Card
 */
function editCard( card ) {
  return {
    type: EDIT_CARD,
    card
  }
}

export function handleEditCard( deck, id ) {
  return ( dispatch ) => {
    console.log( "Editing your CARD: ", id )
    .then(() => dispatch( editDeck( id ) ))
  }
}

/*
 * Delete Deck
 */
function deleteDeck( deck ) {
  return {
    type: DELETE_DECK,
    deck
  }
}

export function handleDeleteDeck( id ) {
  return ( dispatch ) => {
    console.log( "Deleting your DECK: ", id )
    .then(() => dispatch( deleteDeck( id ) ))
  }
}

/*
 * Delete Card
 */
function deleteCard( card ) {
  return {
    type: DELETE_CARD,
    card
  }
}

export function handleDeleteCard( deck, id ) {
  return ( dispatch ) => {
    console.log( "Deleting your CARD: ", id )
    .then(() => dispatch( deleteCard( id ) ))
  }
}