import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip'
import { StyleSheet } from 'react-native'
import { Container, Content, List, ListItem, Icon, Fab } from 'native-base'
import DeckItem from '../shared/DeckItem'
import FloatingActionButton from '../shared/FloatingActionButton'
import { loadInitialData } from '../../actions'
import { pink500 } from '../../utils/colors'

// Lodash business? (npm install, rebuild)
// import _ from 'lodash'

class DeckList extends Component {
  componentWillMount() {
    // this.props.loadInitialData()
  }

  _addDeck = (navigation) => {
    navigation.navigate('AddDeck')
  }

  _addCard = (navigation) => {
    navigation.navigate('AddCard')
  }

  render() {
    const { decks, cards, navigation } = this.props
    console.log("State of decks now:", decks)

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

        {/* <FloatingActionButton 
          navigation={navigation}
          iconOne={'apps'}
          iconTwo={'albums'}
          destOne={'AddDeck'}
          destTwo={'AddCard'}
        /> */}
        <Fab
          containerStyle={{ }}
          style={{ backgroundColor: pink500 }}
          position={"bottomRight"}
          onPress={() => navigation.navigate('AddDeck')}>
          <Icon name="add" />
        </Fab>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {

  }
})

function mapStateToProps(state) {
  // Lodash supposed to be used to convert Firebase's Objects to an Array for <List />
  // const decks = _.map(state.decks, (val, uid) => {
  //   return { ...val, uid }
  // })
  return {
    // decks, // after Lodash - remove line beneath this one 
    decks: state.decks.decks,
    cards: state.cards.cards
  }
}

export default connect(mapStateToProps)(DeckList)
// export default connect(mapStateToProps, {loadInitialData})(DeckList)