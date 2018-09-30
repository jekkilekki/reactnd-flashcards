import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { Container, Header, Content, Fab, H3, Left, Right, ListItem, Body, Button, Title, Card, Icon } from 'native-base'
import CardList from './CardList'
import { tealA700, gray100, pink500, teal500 } from '../../utils/colors'

class AddCardsToDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return {
      title: `Add Cards to ${name}`,
    }
  }

  state = {
    editing: false
  }

  _backToHome = () => {
    const { navigation, id, name } = this.props
    navigation.navigate('DeckSingle', { id: id, name: name })
  }

  render() {
    console.log( "AddCardsToDeck" )

    const { navigation, deck } = this.props
    const theDeck = deck

    return (
      <Container>
        
        <Header style={{backgroundColor: 'white'}}>
          <Body>
            <Title>Add Cards to Deck</Title>
          </Body>
          <Right>
            <Button transparent onPress={this._backToHome}>
              <Text>Cancel</Text>
              <Icon name="close" style={{marginLeft: 5}}/>
            </Button>
          </Right>
        </Header>

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
            navigation={navigation}
            deck={theDeck}
            view={'addCards'}
          />
        </Content>

        <Fab
          style={{ backgroundColor: pink500 }}
          position={'bottomRight'}
          onPress={() => {
            navigation.navigate('AddCard', {deckName: theDeck.name})
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
    decks
  }
}

export default connect(mapStateToProps)(AddCardsToDeck)
