import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swiper from 'react-native-deck-swiper'
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
    timeBegan: Date.now(),
    know: 0,
    dontKnow: 0,
    // score: this.props.navigation.state.params.score || 0,
    index: 0
  }

  componentWillMount() {
    if ( this.props.navigation.state.params.refresh ) {
      this._swiper.jumpToCardIndex(0)
    }
  }

  _rewindBox = () => {
    this.setState({ dontKnow: this.state.dontKnow + 0.5 }) // method seems to run twice...
  }

  _markForReview = () => {
    
  }

  _advanceBox = () => {
    this.setState({ know: this.state.know + 0.5 }) // method seems to run twice...
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
    const { set, name, view, id, cards } = this.props.navigation.state.params
    const { know, dontKnow, timeBegan } = this.state
    this.props.navigation.navigate('QuizModal', { id: id, name: name, set: set, cardObj: cards, cards: this.props.cards, view: view, know: know, dontKnow: dontKnow, time: timeBegan })
  }

  render() {
    // console.log( "Quiz" )
    // console.log( "Do we have a score? ", this.props.navigation.state.params.refresh )

    const { navigation, cards } = this.props
    const { set, name, view, refresh } = navigation.state.params

    const { index } = this.state
    const theCards = Object.values(cards)

    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content style={styles.container}
          contentContainerStyle={{ flex: 1 }}
        >
          <H3>{`${name} Deck: Set #${set}`}</H3>
          <Text>Card {(index + 1) > theCards.length
            ? 1
            : index + 1} of {theCards.length}</Text>
          <View>
            <Swiper
              ref={(swiper) => this._swiper = swiper}
              cards={cards}
              renderCard={(item) => this._renderItem(item)}
              keyExtractor={(card)=> card.id}
              infinite={false}
              cardIndex={index} // begin with first card
              onSwiped={() => this.setState({ index: index + 1 })} // +1 to account for 0 as beginning of array
              onSwipedAll={() => this._completed()}
              onSwipedLeft={this._rewindBox}
              onSwipedRight={this._advanceBox}
              onSwipedTop={this._markForReview}
              // onSwipedBottom={this._discard}
              // onTapCard={this._flip}
              overlayLabels={this.overlayLabels}
              cardVerticalMargin={10}
              cardHorizontalMargin={10}
            />
          </View>
        </Content>
        
        <Footer>
          <FooterTab>
            <Button vertical 
              style={{backgroundColor: pink300}}
              onPress={() => {
                // this._nextCard('left')
                // this.setState((prev) => { index: prev.index+1 })
                this._swiper.swipeLeft()
                this._rewindBox()
              }}
            >
              <Icon style={{color: white}} name="close" />
              <Text style={{color: white}}>I don't know it</Text>
            </Button>
            <Button vertical
              style={{backgroundColor: amber300}}
              onPress={() => {
                // this._nextCard('top')
                // this.setState((prev) => { index: prev.index+1 })
                this._markForReview()
                this._swiper.swipeTop()
              }}
            >
              <Icon style={{color: white}} name="bookmark" />
              <Text style={{color: white}}>Mark for review</Text>
            </Button>
            <Button vertical 
              style={{backgroundColor: teal300}}
              onPress={() => {
                // this._nextCard('right')
                // this.setState((prev) => { index: prev.index+1 })
                this._swiper.swipeRight()
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
  container: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  card: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
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

const overlayLabels = {
  bottom: {
	// element: <Text>BLEAH</Text> /* Optional */
	title: 'BLEAH',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  },
  left: {
	// element: <Text>NOPE</Text> /* Optional */
	title: 'NOPE',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: -30
      }
    }
  },
  right: {
	// element: <Text>LIKE</Text> /* Optional */
	title: 'LIKE',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 30
      }
    }
  },
  top: {
	// element: <Text>SUPER</Text> /* Optional */
	title: 'SUPER LIKE',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
}

function mapStateToProps({cards}, {navigation}) {
  let cardObj = navigation.state.params.cards
  console.log( "Navigation cards: ", cardObj )
  const cardsInThisSet = Object.keys(cardObj).map(i => cardObj[i])
  const cardArray = Object.keys(cards).map(i => cards[i])

  return {
    cards: cardsInThisSet.map(id => cardArray.find(c => c.id === id))
  }
}

export default connect(mapStateToProps)(Quiz)