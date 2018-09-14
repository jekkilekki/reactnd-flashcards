import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Container, Header, Content, List, ListItem, Card, CardItem, Left, Body, Right, H1, H2, H3, Icon } from 'native-base'
import { cards, decks } from '../../utils/_DATA'
import { tealA700 } from '../../utils/colors'
import TopBar from '../shared/TopBar'
import FlashcardItem from '../shared/FlashcardItem'

class CardList extends Component {
  render() {
    return (
      <Container>
        <TopBar headerTitle={"Dictionary"} headerColor={tealA700}/>
        <Content padder>
          <List
            dataArray={cards}
            renderRow={(card) =>
              <FlashcardItem card={card} />
            }
          >
          </List>
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

export default CardList