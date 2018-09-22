import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ImageBackground, StyleSheet, TextInput } from 'react-native'
import { Container, Content, Tabs, Tab, Fab, H1, H2, H3, Input, Left, Right, ListItem, Body, Card, Icon } from 'native-base'
import FloatingActionButton from '../shared/FloatingActionButton'
import { tealA700, gray100 } from '../../utils/colors'
import * as actions from '../../actions'

class CardSingle extends Component {
  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params
    return {
      title: `Single Card`
    }
  }

  state = {
    editing: false
  }

  toggleEditing = () => {
    this.setState((prevState) => {
      editing: !prevState.editing
    })
  }

  render() {
    const { navigation, card, cards } = this.props
    const { editing } = this.state
    const theCard = card[0]

    console.log( theCard )

    return (
      <Container>
        <Content>
          { editing 
            ? <View style={styles.padder}>
                <TextInput
                  value={theCard.korean}
                />
                <TextInput
                  value={theCard.english}
                />
                <TextInput
                  value={theCard.partOfSpeech}
                />
                <TextInput
                  value={theCard.origin}
                />
                <TextInput
                  value={theCard.level}
                />
              </View>
            : <View style={styles.padder}>
                <H1>{theCard.korean}</H1>
                <H2>{theCard.english}</H2>
                <Text>Part of Speech: {theCard.partOfSpeech}</Text>
                <Text>Origin: {theCard.origin}</Text>
                <Text>Level: {theCard.level}</Text>
              </View>
          }
        </Content>
        <FloatingActionButton position={"topRight"} direction={"down"} onPress={() => this.toggleEditing}/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  padder: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  deck: {
    height: 120,
    borderBottomWidth: 0
  },
  deckArrow: {
    height: 100,
    borderBottomWidth: 0
  },
  cardImage: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#555555'
  },
  icon: {
    fontSize: 16,
    // float: 'left',
    color: '#555555'
  },
  boxRow: {
    backgroundColor: gray100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  boxIcon: {
    justifyContent: 'space-around'
  }
})

function mapStateToProps(state, { navigation }) {
  const { id } = navigation.state.params
  const card = state.cards.filter((card) => {
    if ( card.id === id ) {
      return card
    }
  })
  return {
    card: card,
    cards: state.cards
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { cardId } = navigation.state.params
  return {
    remove: () => dispatch(addEntry({
      [cardId]: timeToString() === cardId
        ? getDailyReminderValue()
        : null
    })),
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSingle)
