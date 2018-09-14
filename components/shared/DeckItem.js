import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, Body, Left, Right, Button, Icon, H3, Card, CardItem } from 'native-base'

const DeckItem = (props) => {
  const { deck } = props
  return (
    <ListItem 
      icon noIndent button
      style={[{backgroundColor: 'white'}]}
      onPress={() => alert("Pressed the card!")}
    >
      {/* <Card transparent> */}
        {/* <CardItem
          button
          style={[{backgroundColor: deck.color}, styles.card]}
          onPress={() => alert("Pressed the card!")}
        > */}
          <Left>
            <Button style={{backgroundColor: deck.color}}>
              <Icon active name={deck.icon} />
            </Button>
          </Left>
          <Body>
            <H3>{deck.name}</H3>
            <Text>{deck.description}</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" onPress={() => alert("Pressed the button!")} />
          </Right>
        {/* </CardItem> */}
      {/* </Card> */}
    </ListItem>
  )
}

export default DeckItem