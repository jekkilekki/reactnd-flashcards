import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swiper from 'react-native-deck-swiper'
import CardFlip from 'react-native-card-flip'
import { Text, View, StyleSheet, Animated, TouchableOpacity, AsyncStorage } from 'react-native'
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
    totalTime: Date.now(),
    know: 0,
    dontKnow: 0,
    reviewing: 0,
    index: 0,
    needsRefresh: false,
    flipValue: 0,
    hint: false,
    reverse: false
  }

  shouldComponentUpdate() {
    if ( this.props.navigation.state.params.refresh ) {
      return true
    } else {
      return false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ( prevState.timeBegan !== this.state.timeBegan ) {
      // Somewhere we need to reset the Quiz start time if retaking the quiz
      this.setState({timeBegan: Date.now()});
    }
  }

  componentWillMount() {
    // This is not fired if retaking the quiz it seems
  }

  // Passed as props to Quiz Results - returns setState({ needsRefresh: true })
  onRefresh = (data) => {
    this.setState({data})
  }

  _rewindBox = () => {
    // method seems to run twice...because setState is called twice on each card - onSwiped() as well when updating card index
    this.setState({ dontKnow: this.state.dontKnow + 0.5, hint: false, show: false }) 
  }

  _markForReview = () => {
    // method seems to run twice...because setState is called twice on each card - onSwiped() as well when updating card index
    this.setState({ reviewing: this.state.reviewing + 0.5, hint: false, show: false })
  }

  _advanceBox = () => {
    // method seems to run twice...because setState is called twice on each card - onSwiped() as well when updating card index
    this.setState({ know: this.state.know + 0.5, hint: false, show: false }) 
  }

  _completed = () => {
    const { set, name, view, id, cards } = this.props.navigation.state.params
    const { know, dontKnow, reviewing, timeBegan, totalTime } = this.state

    const knowCount = know
    const dontKnowCount = dontKnow
    const reviewingCount = reviewing 
    const time = timeBegan 

    this.setState({
      // timeBegan: Date.now(),
      know: 0,
      dontKnow: 0,
      reviewing: 0,
      index: 0,
    })
    // Somehow we need to RESTART the Quiz somewhere if exiting the Modal
    // 
    this.props.navigation.navigate('QuizModal', { 
      id: id, 
      name: name, 
      set: set, 
      cardObj: cards, 
      cards: this.props.cards, 
      view: view, 
      know: knowCount, 
      dontKnow: dontKnowCount, 
      reviewing: reviewingCount,
      time: time,
      totalTime: totalTime,
      onRefresh: this.onRefresh
    })
  }

  _hint = () => {
    // Needs to reveal only the first letter of the English word somehow
    this.setState({ hint: ! this.state.hint })
  }

  _renderFlipCard = (item) => {
    return (
      <CardFlip 
        style={[{flex: 1}]}  
        duration={500}
        flipZoom={0.05}
        perspective={500}
        ref={(card) => this.card = card}
      >
        <TouchableOpacity style={[styles.card]} onPress={() => this.card.flip()}>
          <Card style={[styles.card]}>
            <CardItem>
              <H1>{item.korean}</H1>
            </CardItem>
            <View style={styles.cardButtons}>
              <Button transparent onPress={() => this.card.jiggle()}>
                <Icon style={{fontSize: 14}} name="help-circle"/>
                <Text>Hint</Text>
              </Button>
              <Button transparent onPress={() => this.card.flip()}>
                <Text>Reverse</Text>
                <Icon style={{fontSize: 14}} name="sync"/>
              </Button>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card]} onPress={() => this.card.flip()}>
          <Card style={[styles.card]}>
            <CardItem>
              <H1>{item.english}</H1>
            </CardItem>
            <View style={styles.cardButtons}>
              <Button transparent onPress={() => this.card.jiggle()}>
                <Icon style={{fontSize: 14}} name="help-circle"/>
                <Text>Hint</Text>
              </Button>
              <Button transparent onPress={() => this.card.flip()}>
                <Text>Reverse</Text>
                <Icon style={{fontSize: 14}} name="sync"/>
              </Button>
            </View>
          </Card>
        </TouchableOpacity>
      </CardFlip>
    )
  }

  render() {
    // console.log( "Quiz" )
    // console.log( "Do we have a score? ", this.props.navigation.state.params.refresh )

    const { navigation, cards } = this.props
    const { set, name, view, refresh } = navigation.state.params

    const { index } = this.state
    const theCards = Object.values(cards)

    const overlayLabels = {
      bottom: {
      // element: <Text>BLEAH</Text> /* Optional */
        title: 'DELETE',
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
        title: 'HARD',
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
        title: 'EASY',
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
        title: 'REVIEW',
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

    return (
      <View style={{backgroundColor: 'transparent', flex: 1}}>
        <View style={[styles.container, {flex: 1}]}>
          <H3>{`${name} Deck: Set #${set}`}</H3>
          <Text>Card {(index + 1) > theCards.length
            ? 1
            : index + 1} of {theCards.length}</Text>
          <View>
            <Swiper
              ref={(swiper) => this._swiper = swiper}
              cards={cards}
              renderCard={(item) => this._renderFlipCard(item)}
              keyExtractor={(card)=> card.id}
              infinite={true}
              cardIndex={index} // begin with first card
              onSwiped={(cardIndex) => {
                // console.log("Card Index now: ", cardIndex)
                // console.log("Swiper State now: ", this._swiper)
                this.setState({ index: index + 1 })}
              } // +1 to account for 0 as beginning of array
              onSwipedAll={() => this._completed()}
              onSwipedLeft={this._rewindBox}
              onSwipedRight={this._advanceBox}
              onSwipedTop={this._markForReview}
              // onSwipedBottom={this._discard}
              onTapCard={this._flipCard}
              overlayLabels={this.overlayLabels}
              cardVerticalMargin={10}
              cardHorizontalMargin={10}
            />
          </View>

          {/* {this.state.hint &&
            <View>
              <Text>{englishHint}{this.state.show && englishWord}</Text>
            </View>
          }
          {this.state.show &&
            <View>
              <Text>{item.english}</Text>
            </View>
          } */}
        </View>
        
        <Footer style={{position: 'absolute', bottom: 0, backgroundColor: 'transparent'}}>
          <FooterTab>
            <Button vertical 
              style={{backgroundColor: pink300}}
              onPress={() => {
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
                this._swiper.swipeRight()
                this._advanceBox()
              }}
            >
              <Icon style={{color: white}} name="checkmark" />
              <Text style={{color: white}}>I know it</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
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
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  card: {
    height: 200,
    width: 335,
    alignItems: 'center',
    justifyContent: 'center',
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

function mapStateToProps({cards}, {navigation}) {
  let cardObj = navigation.state.params.cards

  const cardsInThisSet = Object.keys(cardObj).map(i => cardObj[i])
  const cardArray = Object.keys(cards).map(i => cards[i])

  return {
    cards: cardsInThisSet.map(id => cardArray.find(c => c.id === id))
  }
}

export default connect(mapStateToProps)(Quiz)