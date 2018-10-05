import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { ListItem, Body, Left, Right, Button, Icon, H3, Card, CardItem } from 'native-base'

class DeckItem extends Component {
  state = {
    defaultDeckImg: 'https://i.pinimg.com/236x/c8/cd/6d/c8cd6dd4d7212c33a79f0ad4c33b02ee.jpg',
  }

  _goToDeck = () => {
    const { deck, navigation } = this.props
    navigation.navigate( 'DeckSingle', { id: deck.id, name: deck.name } )
  }
  
  render() {
    const { deck } = this.props
    const { defaultDeckImg } = this.state

    return (
      <ListItem 
        icon noIndent button
        style={[{backgroundColor: 'white'}, styles.deck]}
        onPress={this._goToDeck}
      >
        <Left>
          <Card style={styles.cardImage}>
            <ImageBackground source={{uri: deck.image || defaultDeckImg}} style={[styles.cardImage, {width: '100%', height: '100%'}]}>
              <Icon name="heart" style={styles.icon}/>
            </ImageBackground>
          </Card>
        </Left>
        <Body style={styles.deck}>
          <H3 style={styles.title}>{deck.name}</H3>
          <Text style={styles.info}>{deck.description}</Text>
          <Text style={styles.info}>
            <Icon 
              name="copy" 
              style={styles.icon} 
            /> {deck.cards.length} Cards | <Icon 
              name="albums" 
              style={styles.icon} 
            /> {Math.ceil(deck.cards.length / 30)} Subsets
          </Text>
        </Body>
        <Right style={styles.deckArrow}>
          <Icon name="arrow-forward" onPress={this._goToDeck} />
        </Right>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
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
  }
})

export default DeckItem