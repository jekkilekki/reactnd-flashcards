import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { ListItem, Body, Left, Right, Button, Icon, H3, Card, CardItem } from 'native-base'

const DeckItem = (props) => {
  const { deck } = props
  return (
    <ListItem 
      icon noIndent button
      style={[{backgroundColor: 'white'}, styles.deck]}
      onPress={() => alert("Pressed the card!")}
    >
      {/* <Card transparent> */}
        {/* <CardItem
          button
          style={[{backgroundColor: deck.color}, styles.card]}
          onPress={() => alert("Pressed the card!")}
        > */}
          <Left>
            <Card style={styles.cardImage}>
              {/* <CardItem style={[styles.cardImage, {backgroundColor: deck.color}]}> */}
                <ImageBackground source={{uri: deck.image}} style={[styles.cardImage, {width: '100%', height: '100%'}]}>
                  <Icon name="heart" style={styles.icon}/>
                </ImageBackground>
              {/* </CardItem> */}
            </Card>
          </Left>
          <Body style={styles.deck}>
            <H3 style={styles.title}>{deck.name}</H3>
            <Text style={styles.info}>{deck.description}</Text>
            <Text style={styles.info}><Icon name="copy" style={styles.icon}/> {deck.length} Cards</Text>
          </Body>
          <Right style={styles.deckArrow}>
            <Icon name="arrow-forward" onPress={() => alert("Pressed the button!")} />
          </Right>
        {/* </CardItem> */}
      {/* </Card> */}
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