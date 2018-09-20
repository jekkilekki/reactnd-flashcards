import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, BackgroundImage, StyleSheet } from 'react-native'
import { tealA700 } from '../../utils/colors'
import * as actions from '../../actions'

class DeckSingle extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: `${deckId}`
    }
  }

  render() {
    const { deck } = this.props

    return (
      <Text>DeckSingle</Text>
    )
  }
}

function mapStateToProps({ decks, cards }) {
  return {
    deck: state.deckSelected,
    cards
  }
}

export default connect(mapStateToProps)(DeckSingle)
