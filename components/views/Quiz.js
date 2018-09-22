import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Content, H1, H2, H3, DeckSwiper, Card, CardItem, Thumbnail, Button, Icon } from 'native-base'

class Quiz extends Component {
  _renderItem = (item) => {
    console.log('This brody item', item)
    return (
    <Card style={{elevation: 3}}>
      <CardItem>
        <H1>{item.korean}</H1>
      </CardItem>
    </Card>
    )
  }

  _completed = () => {
    return (
      <Text>Set Complete</Text>
    )
  }

  render() {
    const { navigation } = this.props
    const { cards, set, name } = navigation.state.params

    console.log('These cards', cards)

    const theCards = Object.values(cards)

    console.log('These cards values', theCards)

    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content padder>
          <H3>{`Quizzing ${name} Deck: Set #${set}`}</H3>
          <Text>Current stats (view)</Text>
          <View>
            <DeckSwiper
              ref={(c) => this._deckSwiper = c}
              dataSource={theCards}
              renderItem={(item) => this._renderItem(item)}
              renderEmpty={() => this._completed}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
            <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
              <Icon name="arrow-back" />
              <Text>Previous Card</Text>
            </Button>
            <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
              <Icon name="arrow-forward" />
              <Text>Next Card</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

export default Quiz