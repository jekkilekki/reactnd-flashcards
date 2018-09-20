import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, Body, Left, Right, Button, Icon, H3, Card, CardItem } from 'native-base'

const FlashcardItem = (props) => {
  const { card } = props

  return (
    <ListItem>
      {/* <Card transparent>
        <CardItem
          button
          style={[{backgroundColor: 'white'}]}
          onPress={() => alert("Pressed the card!")}
        > */}
          <View>
            <Text>{card.item.korean}</Text>
            <Text>{card.item.english}</Text>
          </View>
        {/* </CardItem>
      </Card> */}
    </ListItem>
  )
}

export default FlashcardItem