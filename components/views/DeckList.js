import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip'
import { StyleSheet } from 'react-native'
import { Container, Content, List, ListItem, Icon, Fab } from 'native-base'
import DeckItem from '../shared/DeckItem'
import FloatingActionButton from '../shared/FloatingActionButton'
import { pink500 } from '../../utils/colors'

class DeckList extends Component {
  _addDeck = (navigation) => {
    navigation.navigate('AddDeck')
  }

  _addCard = (navigation) => {
    navigation.navigate('AddCard')
  }

  render() {
    const { decks, cards, navigation } = this.props
    console.log(navigation)

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

        <FloatingActionButton 
          navigation={navigation}
          iconOne={'apps'}
          iconTwo={'albums'}
          destOne={'AddDeck'}
          destTwo={'AddCard'}
        />
        {/* <Fab
          containerStyle={{ }}
          style={{ backgroundColor: pink500 }}
          position={"bottomRight"}
          onPress={() => navigation.navigate('AddDeck')}>
          <Icon name="add" />
        </Fab> */}
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