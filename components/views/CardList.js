import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, FlatList, Text, Platform } from 'react-native'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import { Container, Content, Fab, Icon } from 'native-base'
import { SearchBar } from 'react-native-elements'
import FlashcardItem from '../shared/FlashcardItem'
import Loader from '../shared/Loader'
import { white, pink500, gray50, gray100, gray200, gray300 } from '../../utils/colors'

/**
 * Performance Issues (Loads of good advice / examples)
 * @source https://github.com/reduxjs/redux/issues/1751
 * 
 * 1. Connect components to state at the lowest level possible to prevent cascading renders from parent to children.
 * 2. Normalize your data and pass collections of IDs instead of collections of large objects to components.
 * 3. Use ImmutableJS.
 * 4. Take advantage of "initialProps".
 * 5. Re-define shouldComponentUpdate() when necessary.
 * 6. Use React.addons.Perf to find and eliminate wasted renders.
 * 7. Use Chrome's built-in profiling tools.
 * 
 * Another @link https://benchling.engineering/a-deep-dive-into-react-perf-debugging-fd2063f5a667
 * Another @link https://stackoverflow.com/questions/37264415/how-to-optimize-small-updates-to-props-of-nested-component-in-react-redux/37266130#37266130
 *
 * Consider pagination of the FlashcardItems
 * NativeBase blog @link https://blog.nativebase.io/building-infinite-scroll-in-react-native-e717602553f8
 * Impagination.JS @link https://github.com/flexyford/impagination
 */
class CardList extends Component {
  // More help: https://aboutreact.com/react-native-flatlist-pagination-to-load-more-data-dynamically-infinite-list/
  // Using: https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
  state = {
    refreshing: true,
    searchValue: '',
    numResults: '',
    cardIds: this.props.cardSet ? this.props.cardSet : this.props.cardIds,
    cardData: [],
    page: 0,
    offset: 10,
    error: null
  }

  componentWillMount() {
    this._handleLoadMore()

    const { cardIds, cardData } = this.state
    // If we have cardIds, but no cardData, then map ids to props
    if ( cardIds !== [] && cardData === [] ) {
      const { cards } = this.props
      const cardsInThisDeck = cardIds.map(id => {
        return cards.find(card => { return card.id === cardIds[id] })
      })
      this.setState({
        cardData: cardsInThisDeck
      })
    }
  }

  _filterCards = (text) => {
    const { cards } = this.props
    const newResults = cards.filter((card) => {
      const cardsData = `${card.english.toString().toLowerCase()}
                        ${card.korean.toString().toLowerCase()}`

      const searchData = text.toLowerCase()

      return cardsData.indexOf(searchData) > -1
    })
    this.setState({
      cardData: newResults
    })
  }

  _handleLoadMore = () => {
    console.log( "Loading more..." )
    this.setState({ refreshing: true })

    const { cardIds, cardData, offset, page } = this.state
    const { cards, deck } = this.props
    let subArr = []
    // offset should not change (the number of items we're finding)
    // but the starting index should change based on page number (page 1 = 0, page 2 = offset(1), page3 = offset(2))
    
    // offset(10) * page(0) = 0, page(1) = 10, page(2) = 20, page(3) = 30, etc
    const startIndex = page * offset
    for ( let i = startIndex; i < startIndex + offset; i ++ ) {
      // Make sure we don't exceed our bounds
      if ( i < cardIds.length ) {
        subArr.push( cards.find(card => { return card.id === cardIds[i] }) )
      }
    }
    this.setState({
      cardData: cardData.concat(subArr),
      page: page + 1,
      refreshing: false
    })
  }

  _renderCardItem = (card) => {
    const { navigation, view, deck, cards } = this.props
    const addCards = view === 'addCards' ? true : false

    const found = Object.keys(cards).includes(card.id)
    if ( addCards && found ) console.log( "Found your card in this deck!", card.id )
    return (
      // console.log("Hello card ", card)
      // <Text>Card: {card.toString()}</Text>
      <FlashcardItem card={card} navigation={navigation} addCards={addCards} deck={deck} />
    )
  }

  _renderListFooter = () => {
    if ( this.state.refreshing ) return <Loader />
    else return null
  }

  render() {
    const { navigation, cards, cardIds, deck, cardSet } = this.props
    const { cardData } = this.state
    
    // Use passed Array (cardSet) or full list as Array (stateToProps => cards) for FlatList
    const theCards = deck ? deck : cards
  
    // const _getItemLayout = (data, index) => (
    //   { length: 80, offset: 80 * index, index }
    // )
    // const searchBarHeight = Platform.OS === 'ios' ? 48 : 56

    return (
      <Container>
        <SearchBar
          lightTheme 
          placeholder='Search for card'
          containerStyle={{backgroundColor: gray100, paddingRight: 100, height: 50}}
          inputStyle={{backgroundColor: gray200, fontSize: 14, height: 32}}
          onChangeText={(text) => this._filterCards(text)}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <Text style={{position: 'absolute', right: 10, top: 15}}>{theCards.length} Results</Text>
        {/* <Content padder> */}
          <FlatList
            style={{marginLeft: 10, marginRight: 10}}
            data={cardData}
            renderItem={(card) => this._renderCardItem(card)}
            keyExtractor={(item, i) => (i.toString())}
            ListFooterComponent={this._renderListFooter}
            initialNumToRender={15}
            windowSize={7}
            getItemLayout={(data, index) => (
              { length: 80, offset: 80 * index, index } // better way to handle this outside?
            )}
            onEndReached={this._handleLoadMore}
            onEndReachedThreshold={5}
          />
        {/* </Content> */}

        <Fab
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

function mapStateToProps({ cards }, { deck }) {
  const cardArray = Object.keys(cards).map(i => cards[i])
  let theCards = []
  if ( deck && deck.length > 0 ) {
    theCards = deck.map(id => {
      return cardArray.find(c => c.id === id)
    })
  } else {
    theCards = cardArray
  }

  return { 
    cards: theCards
      .sort((a,b) => {
        return (a.korean < b.korean) ? -1 : (a.korean > b.korean) ? 1 : 0
      }),
    cardIds: theCards
      .sort((a,b) => {
        return (a.korean < b.korean) ? -1 : (a.korean > b.korean) ? 1 : 0
      })
      .map((card) => card.id) // Just send an array of card IDs
  }
}

export default connect(mapStateToProps)(CardList)