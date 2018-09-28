import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, FlatList, Text } from 'react-native'
import { Container, Content, Fab, Icon } from 'native-base'
import { SearchBar } from 'react-native-elements'
import FlashcardItem from '../shared/FlashcardItem'
import { white, pink500, gray50, gray100, gray200, gray300 } from '../../utils/colors'

class CardList extends Component {
  state = {
    numResults: '',
    cardResults: '',
    searchValue: ''
  }

  _filterCards = (text) => {
    const newResults = this.state.cardResults.filter((card) => {
      const cardData = `${card.english.toString().toLowerCase()}
      ${card.korean.toString().toLowerCase()}`

      const searchData = text.toLowerCase()

      return cardData.indexOf(searchData) > -1
    })
    this.setState({
      cardResults: newResults
    })
  }

  _renderCardItem = (card, deck) => {
    const { navigation, view } = this.props
    const addCards = view === 'addCards' ? true : false
    // console.log( "Found in deck: ", deck.cards.find((c) => c.id === card.item.id))
    // console.log( "Deckie: " + deck + " Cardie: " + card)
    return (
      <FlashcardItem card={card} navigation={navigation} addCards={addCards} deck={deck} />
    )
  }

  render() {
    const { navigation, cards, view, deck, cardSet } = this.props
    // console.log(cards)
    
    // console.log("State of cards now:", cards)

    const theCards = cardSet ? cardSet : cards

    return (
      <Container>
        <SearchBar
          lightTheme 
          // showLoading
          placeholder='Search for card'
          containerStyle={{backgroundColor: gray100, paddingRight: 100}}
          inputStyle={{backgroundColor: gray200, fontSize: 14}}
          onChangeText={(text) => this._filterCards(text)}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <Text style={{position: 'absolute', right: 10, top: 15}}>{theCards.length} Results</Text>
        <Content padder>
          <FlatList
            keyExtractor={(item, i) => {return i.toString()}}
            data={theCards}
            renderItem={(card) => this._renderCardItem(card, deck)}
          >
          </FlatList>
        </Content>

        {/* <FloatingActionButton /> */}
        <Fab
          // active={this.state.active}
          // direction={this.props.direction || "up"}
          // containerStyle={{ }}
          style={{ backgroundColor: pink500 }}
          position={'bottomRight'}
          onPress={() => {
            navigation.navigate('AddCard')
          }}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20
  }
})

function mapStateToProps(state, {deck}) {
  return { 
    cards: state.cards
      // .sort((a,b) => {
      //   return (a.korean < b.korean) ? -1 : (a.korean > b.korean) ? 1 : 0
      // })
  }
}

export default connect(mapStateToProps)(CardList)