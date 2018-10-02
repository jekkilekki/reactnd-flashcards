import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Body, Left, Right, Button, Badge, Icon, H3, Card, CardItem } from 'native-base'
import { handleAddCardToDeck } from '../../actions/decks'
import { getPartOfSpeech } from '../../utils/helpers'
import { teal500, pink300 } from '../../utils/colors'

class FlashcardItem extends PureComponent {

  _addCardToDeck = (deckId, card) => {
    const { dispatch } = this.props
    try {
      // Update Redux
      console.log( 'Adding card ', card, ' to deck ', deckId )
      dispatch( handleAddCardToDeck(deckId, card) )
      // Save to 'DB'
      // addDeckToStorage({ key, deck }) -> refactor like AddEntry in Udacifitness
    } catch (e) {
      console.log('Error adding Card to your Deck.', e.message)
    }
  }

  _handleCardPress = () => {
    const { card, addCards, navigation, deck } = this.props
    if ( addCards ) {
      this._addCardToDeck(deck.id, card.item.id)
    } else {
      navigation.navigate( 'CardSingle', { id: card.item.id, index: card.index } )
      console.log( 'Card Pressed: ', card )
    }
  }

  render() {
    // console.log("FlashcardItem", this.props.card )
    const { card, cardInDeck } = this.props

    return (
      <ListItem noIndent
        onPress={this._handleCardPress}
      >
        <Left style={{flex: 1, marginLeft: -5}}>
          {getPartOfSpeech(card.item.partOfSpeech)}
          <Text>{card.item.korean}</Text>
        </Left>
        <Body style={{flex: 2}}>
          <Text>{card.item.english}</Text>
        </Body>
        <Right style={{flex: 1}}>
          { cardInDeck
            ? <Icon name="checkmark-circle" style={{color: teal500}} onPress={this._handleCardPress} />
            : <Icon name="arrow-forward" onPress={this._handleCardPress} />
          }
        </Right>
      </ListItem>
    )
  }
}

export default connect()(FlashcardItem)