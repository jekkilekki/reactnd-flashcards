import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Container, Content, H1, H2, H3, DeckSwiper, Card, CardItem, Thumbnail, Button, Icon, Footer, FooterTab } from 'native-base'
import { white, pink300, red300, amber300, green300, teal300 } from '../../utils/colors'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { view } = navigation.state.params
    const title = view === 'quiz' ? 'Quizzing' : 'Learning'
    return {
      title: title
    }
  }

  state = {
    toReview: [],
    score: 0,
    index: 1
  }

  _nextCard = () => {
    this.setState((prevState) => {
      index: prevState.index++
    })
    console.log(this.state.index)
  }

  _rewindBox = () => {

  }

  _markForReview = () => {
    // this.setState({

    // })
  }

  _advanceBox = () => {
    this.setState((prevState) => {
      score: prevState.score++
    })
  }

  _renderItem = (item) => {
    console.log("Item: ", item)
    return (
      <View>
        <Card style={[{elevation: 3}, styles.card]}>
          <CardItem>
            <H1>{item.korean}</H1>
          </CardItem>
          <View style={styles.cardButtons}>
            <Button transparent>
              <Icon style={{fontSize: 14}} name="help-circle"/>
              <Text>Hint</Text>
            </Button>
            <Button transparent>
              <Text>Reverse</Text>
              <Icon style={{fontSize: 14}} name="sync"/>
            </Button>
          </View>
        </Card>
      </View>
    )
  }

  _completed = () => {
    return (
      <Text>Set Complete</Text>
    )
  }

  render() {
    console.log( "Quiz" )

    const { navigation } = this.props
    const { cards, set, name, view } = navigation.state.params
    const { index } = this.state
    const theCards = Object.values(cards)

    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content padder
          contentContainerStyle={{ flex: 1 }}
        >
          <H3>{`${name} Deck: Set #${set}`}</H3>
          <Text>Card {index} of {theCards.length}</Text>
          <View>
            <DeckSwiper
              ref={(c) => this._deckSwiper = c}
              dataSource={theCards}
              renderItem={this._renderItem(item)}
              renderEmpty={this._completed}
              looping={false}
            />
          </View>
        </Content>
        
        <Footer>
          <FooterTab>
            <Button vertical 
              style={{backgroundColor: pink300}}
              onPress={() => {
                this.setState((prev) => { index: prev.index+1 })
                this._deckSwiper._root.swipeLeft()
                this._rewindBox()
              }}
            >
              <Icon style={{color: white}} name="close" />
              <Text style={{color: white}}>I don't know it</Text>
            </Button>
            <Button vertical
              style={{backgroundColor: amber300}}
              onPress={() => {
                this.setState((prev) => { index: prev.index+1 })
                this._markForReview()
              }}
            >
              <Icon style={{color: white}} name="bookmark" />
              <Text style={{color: white}}>Mark for review</Text>
            </Button>
            <Button vertical 
              style={{backgroundColor: teal300}}
              onPress={() => {
                this.setState((prev) => { index: prev.index+1 })
                this._deckSwiper._root.swipeRight()
                this._advanceBox()
              }}
            >
              <Icon style={{color: white}} name="checkmark" />
              <Text style={{color: white}}>I know it</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardButtons: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    left: 0,
    right: 0,
    justifyContent: 'space-between'
  }
})

export default Quiz