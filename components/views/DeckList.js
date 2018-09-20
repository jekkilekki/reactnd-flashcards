import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip'
import { StyleSheet } from 'react-native'
import { Container, Content, List} from 'native-base'
import DeckItem from '../shared/DeckItem'
import FloatingActionButton from '../shared/FloatingActionButton'

class DeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    title: 'Decks'
  }

  render() {
    const { decks, cards } = this.props

    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content>
          <CalendarStrip showMonth={false}/>
          <List
            dataArray={decks}
            renderRow={(deck) =>
              <DeckItem deck={deck} />
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
  return { decks: state.decks }
}

export default connect(mapStateToProps)(DeckList)