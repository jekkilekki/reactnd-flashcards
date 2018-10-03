import React, { Component } from 'react'
import { StyleSheet, FlatList, ImageBackground, Text, View } from 'react-native'
import { Container, Content, Card, CardItem, H1 } from 'native-base'
import { gray300 } from '../../utils/colors'

class CardSets extends Component {
  _renderItem = (set, i) => {
    const { view, name, navigation, deckId } = this.props
    return (
    <Card style={styles.cardImage}>
      <CardItem 
        button
        style={styles.cardImage}
        onPress={() => navigation.navigate('Quiz', {cards: set, set: i+1, id: deckId, name: name, view: view})}
      >
        <ImageBackground style={[styles.cardImage, {width: '100%', height: '100%'}]}>
          <H1>{i+1}</H1>
          <Text style={styles.info}>{Object.keys(set).length} Cards</Text>
        </ImageBackground>
      </CardItem>
    </Card>
    )
  }

  render() {
    const { cardSet } = this.props

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList 
        style={styles.setList}
        numColumns={4}
        keyExtractor={(item, i) => {return i.toString()}}
        data={cardSet}
        renderItem={({item, index}) => this._renderItem(item, index)}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20
  },
  cardImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    backgroundColor: gray300,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  },
  setList: {
    paddingTop: 0,
    paddingBottom: 20
  },
  info: {
    fontSize: 13,
    color: '#555555',
    paddingTop: 10
  },
})

export default CardSets