import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip'
import { StyleSheet } from 'react-native'
import { Container, Content, List, Icon, Fab } from 'native-base'
import DeckItem from '../shared/DeckItem'
import Loader from '../shared/Loader'
import { pink500 } from '../../utils/colors'

class DeckList extends Component {
  render() {
    const { decks, navigation } = this.props

    // Show Loader if loading data
    if (decks === undefined || decks === 'undefined' || decks === null) {
      return <Loader />
    }

    // Convert Object to Array for List
    const deckArray = Object.keys(decks).map(i => decks[i])

    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content>
          <CalendarStrip showMonth={false}/>
          <List
            dataArray={deckArray}
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

function mapStateToProps({decks}) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)