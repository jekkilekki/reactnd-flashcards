import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { ListItem, Body, Left, Right, Button, Icon, H3, Card, CardItem } from 'native-base'
import { selectDeck } from '../../actions'

const DeckItem = (props) => {
  const { deck, navigation } = props
  return (
    <ListItem 
      icon noIndent button
      style={[{backgroundColor: 'white'}, styles.deck]}
      onPress={() => navigation.navigate( 'DeckSingle', { id: deck.id, name: deck.name } )}
    >
      <Left>
        <Card style={styles.cardImage}>
          <ImageBackground source={{uri: deck.image}} style={[styles.cardImage, {width: '100%', height: '100%'}]}>
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
        <Icon name="arrow-forward" onPress={() => navigation.navigate( 'DeckSingle', { id: deck.id } )} />
      </Right>
    </ListItem>
  )
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