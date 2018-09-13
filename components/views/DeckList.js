import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Container, Header, Content, List, ListItem, Card, CardItem, Left, Body, Right, H1, H2, H3, Icon } from 'native-base'
import { cards, decks } from '../../utils/_DATA'
import { tealA700 } from '../../utils/colors'
import Nav from '../shared/Nav'

class DeckList extends Component {
  render() {
    return (
      <Container>
        <Nav headerTitle={"Decks"} headerColor={tealA700}/>
        <Content padder>
          <List
            dataArray={decks}
            renderRow={(deck) =>
              // <ListItem>
                <Card transparent>
                  <CardItem
                    button
                    style={[{backgroundColor: deck.color}, styles.card]}
                    onPress={() => alert("Pressed the card!")}
                  >
                    <Left>
                      <Icon name={deck.icon} />
                    </Left>
                    <View>
                      <H3>{deck.name}</H3>
                      <Text>{deck.description}</Text>
                    </View>
                    <Right>
                      <Icon name="arrow-forward" onPress={() => alert("Pressed the button!")} />
                    </Right>
                  </CardItem>
                </Card>
              // </ListItem>
            }
          >
          </List>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20
  }
})

export default DeckList