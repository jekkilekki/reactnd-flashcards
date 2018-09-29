import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Body, Left, Right, Button, Badge, Icon, H3, Card, CardItem } from 'native-base'
import { addCardToDeck } from '../../actions/decks'
import { getPartOfSpeech } from '../../utils/helpers'
import { teal500, pink300 } from '../../utils/colors'

class FlashcardItem extends Component {
  state = {
    once: true
  }

  _addCardToDeck = (deckId, card) => {
    const { dispatch } = this.props
    try {
      // Update Redux
      dispatch( addCardToDeck(deckId, card) )
      // Save to 'DB'
      // addDeckToStorage({ key, deck }) -> refactor like AddEntry in Udacifitness
    } catch (e) {
      console.log('Error adding Card to your Deck.', e.message)
    }
  }

  _handleCardPress = () => {
    const { card, addCards, navigation, deck } = this.props
    if ( addCards ) {
      this._addCardToDeck(deck.id, card.item)
    } else {
      navigation.navigate( 'CardSingle', { id: card.item.id } )
    }
  }

  render() {
    const { allCards, cardsInDeck, card, navigation, cardInDeck, addCards, deck } = this.props

    console.log("flashcard item")
    // if ( this.state.once ) {
    //   console.log("This one card: ", card)
    //   console.log( "Found card: ", foundCard[0] )
    //   this.setState({ once: false })
    // }
    // console.log( "All cards: ", Object.keys(allCards[0]) )
    // const foundCard = allCards
    //   .filter((card) => Object.keys(card).id === card.item.id)

    return (
      <ListItem noIndent
        onPress={() => this._handleCardPress()}
      >
        {/* <Card transparent>
        <CardItem
          button
          style={[{backgroundColor: 'white'}]}
          onPress={() => alert("Pressed the card!")}
        > */}
        <Left style={{flex: 1, marginLeft: -5}}>
          {getPartOfSpeech(card.item.partOfSpeech)}
          <Text>{card.item.korean}</Text>
        </Left>
        <Body style={{flex: 2}}>
          <Text>{card.item.english}</Text>
        </Body>
        <Right style={{flex: 1}}>
          {/* <Badge>
            <Text>{card.item.partOfSpeech}</Text>
          </Badge> */}
          { cardInDeck
            ? <Icon name="checkmark-circle" style={{color: teal500}} onPress={() => this._handleCardPress()} />
            : <Icon name="arrow-forward" onPress={() => this._handleCardPress()} />
          }
        </Right>
        {/* </CardItem>
        </Card> */}
      </ListItem>
    )
  }
}

function mapStateToProps({ decks, cards }) {
  return {
    cardsInDeck: decks.cards,
    allCards: cards
  }
}

export default connect(mapStateToProps)(FlashcardItem)