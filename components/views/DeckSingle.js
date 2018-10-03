import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { Container, Content, Tabs, Tab, Fab, H3, Left, ListItem, Body, Card, Icon } from 'native-base'
import CardList from './CardList'
import CardSets from '../shared/CardSets'
import { tealA700, gray100, gray900, pink500 } from '../../utils/colors'

class DeckSingle extends Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return {
      title: `${name} Deck`
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
    const { navigation, deck } = this.props
    const theDeck = deck
    const theCards = theDeck.cards ? theDeck.cards : []

    const splitSubsets = (givenArray, size) => {
      let results = []
      for (var i = 0; i < givenArray.length; i += size) {
        results.push(Object.assign({}, givenArray.slice(i, i+size)))
      }
      return results
    }

    const subsets = splitSubsets( theCards, 30 )

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
          <View style={[styles.padder, styles.boxRow]}>
            <Icon name="cube" style={styles.boxIcon}/>
            <Icon name="cube" style={styles.boxIcon}/>
            <Icon name="cube" style={styles.boxIcon}/>
            <Icon name="cube" style={styles.boxIcon}/>
            <Icon name="cube" style={styles.boxIcon}/>
            <Icon name="cube" style={styles.boxIcon}/>
          </View>
          <View>
            <Tabs tabBarUnderlineStyle={{backgroundColor: tealA700}}>
              <Tab 
                heading={`Sets (${subsets.length})`}
                tabStyle={{backgroundColor: gray100}} 
                textStyle={{color: gray900}} 
                activeTabStyle={{backgroundColor: gray100}} 
                activeTextStyle={{color: gray900, fontWeight: 'bold'}}  
              >
                { theCards.length < 1
                  ? <Text style={[{textAlign: 'left', paddingTop: 20, marginLeft: 10, marginRight: 10}]}>No cards in this data set yet. Click the "Plus" button in the upper-left to add some.</Text>
                  : <Text style={[{textAlign: 'center', paddingTop: 20}]}>Select a subset to study. (No score)</Text>
                }
                <CardSets 
                  cardSet={subsets} 
                  view={'sets'} 
                  name={theDeck.name}
                  deckId={theDeck.id}
                  navigation={navigation}
                />
              </Tab>
              <Tab 
                heading={`Cards (${theCards.length})`}
                tabStyle={{backgroundColor: gray100}} 
                textStyle={{color: gray900}} 
                activeTabStyle={{backgroundColor: gray100}}
                activeTextStyle={{color: gray900, fontWeight: 'bold'}}   
              >
                <CardList 
                  deck={theCards} 
                  navigation={navigation}
                />
              </Tab>
              <Tab 
                heading={`Quiz ▶︎`}
                tabStyle={{backgroundColor: gray100}} 
                textStyle={{color: gray900}} 
                activeTabStyle={{backgroundColor: gray100}}  
                activeTextStyle={{color: gray900, fontWeight: 'bold'}}   
              >
                { theCards.length < 1
                  ? <Text style={[{textAlign: 'left', paddingTop: 20, marginLeft: 10, marginRight: 10}]}>No cards in this data set yet. Click the "Plus" button in the upper-left to add some.</Text>
                  : <Text style={[{textAlign: 'center', paddingTop: 20}]}>Please select a subset to quiz. (Score recorded)</Text>
                }
                <CardSets 
                  cardSet={subsets}
                  view={'quiz'} 
                  id={theDeck.id}
                  name={theDeck.name}
                  navigation={navigation}
                />
              </Tab>
            </Tabs>
          </View>
        </Content>

        <Fab
          style={{ backgroundColor: pink500 }}
          position={'topRight'}
          onPress={() => {
            navigation.navigate('AddCardsModal', {id: theDeck.id, name: theDeck.name})
          }}
        >
          <Icon name="add" />
        </Fab>
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

function mapStateToProps({ decks }, { navigation }) {
  const { id } = navigation.state.params
  const deck = Object.keys(decks).filter((d) => {
    if ( d === id ) {
      return d
    }
  })
  return {
    deck: decks[deck],
    decks, 
  }
}

export default connect(mapStateToProps)(DeckSingle)
