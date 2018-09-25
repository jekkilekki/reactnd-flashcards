import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, Body, Left, Right, Button, Badge, Icon, H3, Card, CardItem } from 'native-base'

const FlashcardItem = (props) => {
  const { card, navigation, view } = props

  // console.log(card)

  return (
    <ListItem noIndent
      onPress={() => navigation.navigate( 'CardSingle', { id: card.item.id } )}
    >
      {/* <Card transparent>
      <CardItem
        button
        style={[{backgroundColor: 'white'}]}
        onPress={() => alert("Pressed the card!")}
      > */}
      <Left style={{flex: 1}}>
        <Text>{card.item.korean}</Text>
      </Left>
      <Body style={{flex: 2}}>
        <Text>{card.item.english}</Text>
      </Body>
      <Right style={{flex: 1}}>
        {/* <Badge>
          <Text>{card.item.partOfSpeech}</Text>
        </Badge> */}
        {
          view === 'addCards'
            ? <Icon name="plus" onPress={() => alert('adding card to this deck!')} />
            : <Icon name="arrow-forward" onPress={() => navigation.navigate( 'CardSingle', { id: card.item.id } )} />
        }
      </Right>
      {/* </CardItem>
      </Card> */}
    </ListItem>
  )
}

export default FlashcardItem