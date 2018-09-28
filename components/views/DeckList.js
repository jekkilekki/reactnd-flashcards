import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip'
import { StyleSheet } from 'react-native'
import { Container, Content, List, ListItem, Icon, Fab } from 'native-base'
import DeckItem from '../shared/DeckItem'
import Loader from '../shared/Loader'
import { handleInitialData } from '../../actions/shared'
import { pink500 } from '../../utils/colors'

class DeckList extends Component {
  state = {
    dataLoaded: false
  }

  async componentWillMount() {
    await this.props.handleInitialData()
    // this.setState({ dataLoaded: true })
  }

  _addDeck = (navigation) => {
    navigation.navigate('AddDeck')
  }

  _addCard = (navigation) => {
    navigation.navigate('AddCard')
  }

  render() {
    const { decks, cards, navigation } = this.props

    if (decks === undefined || decks === 'undefined' || decks === null || cards === undefined || cards === 'undefined' || cards === null) {
      return <Loader />
    }

    console.log("State of decks now:", decks)

    const deckArray = Object.keys(decks).map(i => decks[i])
    const cardArray = Object.keys(cards).map(i => cards[i])

    console.log( "Deck array: ", deckArray )

    let sortedDecks = deckArray.map((deck) => {
      return cardArray.filter((card) => {
        if (deck.level === card.level) {
          return card.id
        }
      })
    })

    console.log( "Sorted Decks: ", sortedDecks )

    deckArray.map((deck, i) => {
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

function mapStateToProps({decks, cards}) {
  return {
    decks,
    cards
  }
}

// export default connect(mapStateToProps)(DeckList)
export default connect(mapStateToProps, {handleInitialData})(DeckList)