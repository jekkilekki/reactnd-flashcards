import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import { Container, Header, Content, List, ListItem, Card, CardItem, Left, Body, Right, H1, H2, H3, Icon } from 'native-base'
import { tealA700 } from '../../utils/colors'
import TopBar from '../shared/TopBar'
import FlashcardItem from '../shared/FlashcardItem'

class CardList extends Component {
  _keyExtractor( item, index ) {
    return index.toString()
  }

  render() {
    const { decks, cards } = this.props

    return (
      <Container>
        <TopBar headerTitle={"Dictionary"} headerColor={tealA700}/>
        <Content padder>
          <FlatList
            keyExtractor={this._keyExtractor}
            data={cards}
            renderItem={(card) =>
              <FlashcardItem card={card} />
            }
          >
          </FlatList>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20
  }
})

function mapStateToProps(state) {
  return { cards: state.cards }
}

export default connect(mapStateToProps)(CardList)