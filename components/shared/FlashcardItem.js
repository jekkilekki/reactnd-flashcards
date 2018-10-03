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
      // Update Redux & save to AsyncStorage (chained calls to dispatch)
      dispatch( handleAddCardToDeck(deckId, card) )
    } catch (e) {
      console.log('Error adding Card to your Deck.', e.message)
    }
  }

  _handleCardPress = () => {
    const { card, addCards, navigation, deck } = this.props
    if ( addCards ) {
      console.log( "Card ID: ", card.item.id )
      console.log( "Deck: ", deck )
      this._addCardToDeck(deck.id, card.item.id)
    } else {
      navigation.navigate( 'CardSingle', { id: card.item.id, index: card.index } )
    }
  }

  render() {
    const { card, addCards, cardInDeck } = this.props

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