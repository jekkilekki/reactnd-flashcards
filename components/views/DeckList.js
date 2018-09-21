import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip'
import { StyleSheet } from 'react-native'
import { Container, Content, List, ListItem } from 'native-base'
import DeckItem from '../shared/DeckItem'
import FloatingActionButton from '../shared/FloatingActionButton'

class DeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    title: 'Decks'
  }

  render() {
    const { decks, cards, navigation } = this.props

    let sortedDecks = decks.map((deck) => {
      return cards.filter((card) => {
        if (deck.level === card.level) {
          return card.id
        }
      })
    })

    decks.map((deck, i) => {
      deck.cards = sortedDecks[i]
    })
    
    // function sortCards(objectArray, property) {
    //   return objectArray.reduce( function ( acc, obj ) {
    //     var key = obj[property]
    //     if ( !acc[key]) {
    //       acc[key] = []
    //     }
    //     acc[key].push(obj)
    //     return acc
    //   }, {})
    // }

    // var sortedCards = sortCards(cards, 'level')

    // console.group()
    // console.log(sortedDecks)
    // console.log(decks)
    // console.groupEnd()

    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content>
          <CalendarStrip showMonth={false}/>
          <List
            dataArray={decks}
            renderRow={(deck, id) =>
              <DeckItem deck={deck} navigation={navigation} />
            }
          >
          </List>
        </Content>

        <FloatingActionButton />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {

  }
})

function mapStateToProps(state) {
  return { 
    decks: state.decks,
    cards: state.cards 
  }
}

export default connect(mapStateToProps)(DeckList)