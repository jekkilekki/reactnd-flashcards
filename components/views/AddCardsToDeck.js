import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { Container, Content, Tabs, Tab, Fab, H3, Left, Right, ListItem, Body, Card, Icon } from 'native-base'
import CardList from './CardList'
import { tealA700, gray100 } from '../../utils/colors'
import * as actions from '../../actions'

class AddCardsToDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params
    let deckId = id.charAt(0).toUpperCase() + id.substr(1);
    return {
      title: `Add Cards to ${deckId} Deck`
    }
  }

  state = {
    editing: false
  }

  toggleEditing = () => {
    this.setState((prevState) => {
      editing: !prevState.editing
    })
  }

  render() {
    const { navigation, deck, decks } = this.props
    const theDeck = deck[0]
    const theCards = theDeck.cards

    return (
      <Container>
        <Content>
          <View style={styles.padder}>
            <H3>{theDeck.name}</H3>
            <ListItem icon noIndent
              style={[{backgroundColor: 'white'}, styles.deck]}
            >
              <Left>
                <Card style={styles.cardImage}>
                  <ImageBackground source={{uri: theDeck.image}} style={[styles.cardImage, {width: '100%', height: '100%'}]}>
                    <Icon name="heart" style={styles.icon}/>
                  </ImageBackground>
                </Card>
              </Left>
              <Body style={styles.deck}>
                <Text style={styles.info}>{theDeck.description}</Text>
                <Text style={styles.info}>
                  <Icon 
                    name="copy" 
                    style={styles.icon} 
                  /> {theDeck.cards.length} Cards
                </Text>
                <Text style={styles.info}>
                  <Icon 
                    name="albums" 
                    style={styles.icon} 
                  /> {Math.ceil(theDeck.cards.length / 30)} Subsets
                </Text>
              </Body>
            </ListItem>
          </View>
          <CardList 
            cardSet={theCards} 
            navigation={navigation}
            view={'addCards'}
          />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  padder: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  deck: {
    height: 120,
    borderBottomWidth: 0
  },
  deckArrow: {
    height: 100,
    borderBottomWidth: 0
  },
  cardImage: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#555555'
  },
  icon: {
    fontSize: 16,
    // float: 'left',
    color: '#555555'
  },
  boxRow: {
    backgroundColor: gray100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  boxIcon: {
    justifyContent: 'space-around'
  }
})

// function mapStateToProps({ decks, cards, navigation }) {
//   return {
//     // deck: navigation.state.params,
//     decks,
//     cards
//   }
// }

function mapStateToProps(state, { navigation }) {
  const { id } = navigation.state.params
  const deck = state.decks.filter((deck) => {
    if ( deck.id === id ) {
      return deck
    }
  })
  return {
    deck: deck,
    decks: state.decks
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    remove: () => dispatch(addEntry({
      [deckId]: timeToString() === deckId
        ? getDailyReminderValue()
        : null
    })),
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardsToDeck)
