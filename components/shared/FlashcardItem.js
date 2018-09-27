import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Body, Left, Right, Button, Badge, Icon, H3, Card, CardItem } from 'native-base'
import { teal500, tealA700 } from '../../utils/colors'

class FlashcardItem extends Component {
  state = {
    once: true
  }

  _handleCardPress = () => {
    const { card, addCards, navigation } = this.props
    if ( addCards ) {
      alert( 'Adding card id: ', card.item.id )
    } else {
      navigation.navigate( 'CardSingle', { id: card.item.id } )
    }
  }

  render() {
    const { allCards, foundCard, card, navigation, addCards, deck } = this.props

    
    if ( this.state.once ) {
      console.log("This one card: ", card)
      console.log( "Found card: ", Object.keys(foundCard[0]) )
      this.setState({ once: false })
    }
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
        <Left style={{flex: 1}}>
          <Text>{card.item.korean}</Text>
        </Left>
        <Body style={{flex: 2}}>
          <Text>{card.item.english}</Text>
        </Body>
        <Right style={{flex: 1}}>
          {/* <Badge>
            <Text>{card.item.partOfSpeech}</Text>
          </Badge> */}
          { addCards
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

function mapStateToProps(state, {navigation}) {
  return {
    foundCard: state.cards.cards
      // .filter((card) => Object.values(card).id === navigation.state.params.id)
  }
}

export default connect(mapStateToProps)(FlashcardItem)