import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, FlatList, Text } from 'react-native'
import { Container, Content } from 'native-base'
import { SearchBar } from 'react-native-elements'
import FlashcardItem from '../shared/FlashcardItem'
import FloatingActionButton from '../shared/FloatingActionButton'
import { white, gray50, gray100, gray200, gray300 } from '../../utils/colors'
/* Hack for Samsung laptop - Redux store not importing 'cards'? Delete on iMac */
// import { cards } from '../../utils/_DATA'

class CardList extends Component {
  state = {
    numResults: this.props.cardSet ? this.props.cardSet.length : cards.length
  }

  render() {
    const { cards, cardSet, navigation } = this.props
    console.log(navigation)

    return (
      <Container>
        <SearchBar
          lightTheme showLoading
          placeholder='Search for card'
          containerStyle={{backgroundColor: gray100, paddingRight: 100}}
          inputStyle={{backgroundColor: gray200, fontSize: 14}}
        />
        <Text style={{position: 'absolute', right: 10, top: 15}}>{this.state.numResults} Results</Text>
        <Content padder>
          <FlatList
            keyExtractor={(item, i) => {return i.toString()}}
            data={cardSet ? cardSet : cards}
            renderItem={(card) =>
              <FlashcardItem card={card} navigation={navigation} />
            }
          >
          </FlatList>
        </Content>

        <FloatingActionButton />
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
  return { cards: state.cards }
}

export default connect(mapStateToProps)(CardList)