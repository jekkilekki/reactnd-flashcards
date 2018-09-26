import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, FlatList, Text } from 'react-native'
import { Container, Content, Fab, Icon } from 'native-base'
import { SearchBar } from 'react-native-elements'
import FlashcardItem from '../shared/FlashcardItem'
import FloatingActionButton from '../shared/FloatingActionButton'
import { white, pink500, gray50, gray100, gray200, gray300 } from '../../utils/colors'

class CardList extends Component {
  state = {
    numResults: this.props.cardSet ? this.props.cardSet.length : this.props.cards.length,
    cardResults: this.props.cardSet ? this.props.cardSet : this.props.cards,
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

  render() {
    const { navigation } = this.props

    return (
      <Container>
        <SearchBar
          lightTheme showLoading
          placeholder='Search for card'
          containerStyle={{backgroundColor: gray100, paddingRight: 100}}
          inputStyle={{backgroundColor: gray200, fontSize: 14}}
          onChangeText={(text) => this._filterCards(text)}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <Text style={{position: 'absolute', right: 10, top: 15}}>{this.state.numResults} Results</Text>
        <Content padder>
          <FlatList
            keyExtractor={(item, i) => {return i.toString()}}
            data={this.state.cardResults}
            renderItem={(card) =>
              <FlashcardItem card={card} navigation={navigation} addCards={true} deck={this.props.deck} />
            }
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

function mapStateToProps(state) {
  return { cards: state.cards.cards }
}

export default connect(mapStateToProps)(CardList)