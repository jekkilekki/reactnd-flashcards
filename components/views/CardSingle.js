import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ImageBackground, StyleSheet, TextInput } from 'react-native'
import { Container, Content, H1, H2, H3, Card, CardItem, Button, Fab, Icon, Textarea } from 'native-base'
import FloatingActionButton from '../shared/FloatingActionButton'
import { tealA700, teal500, pink300, gray100 } from '../../utils/colors'
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

  render() {
    const { navigation, card, cards } = this.props
    const { editing } = this.state
    const theCard = card[0]

    console.log( theCard )

    return (
      <Container>
        <Content padder>
          <View>
          <Card style={[{elevation: 3}, styles.card]}>
            <CardItem>
              { editing 
                ? <TextInput value={theCard.korean} style={{fontSize: 27}}/>
                : <H1>{theCard.korean}</H1>
              }
            </CardItem>
            <CardItem>
              { editing 
                ? <TextInput value={theCard.english} style={{fontSize: 21}}/>
                : <H3>{theCard.english}</H3>
              }
            </CardItem>
            <CardItem>
              { editing
                ? <TextInput value={theCard.origin} />
                : <Text>{theCard.origin}</Text>
              }
            </CardItem>
            <View style={styles.cardButtons}>
              {/* <Icon style={{fontSize: 14}} name="help-circle"/> */}
              { editing
                ? <View><Text>Part of Speech: </Text><TextInput value={theCard.partOfSpeech} /></View>
                : <Button transparent><Text>Part of Speech: {theCard.partOfSpeech}</Text></Button>
              }
              { editing
                ? <View><Text>Level: </Text><TextInput value={theCard.level} /></View>
                : <Button transparent><Text>Level: {theCard.level}</Text></Button>
              }
              {/* <Icon style={{fontSize: 14}} name="sync"/> */}
            </View>
          </Card>
          { editing &&
            <View>
              <H2>Sentences</H2>
              <Textarea rows={5} 
                value={theCard.sentences ? theCard.sentences.toString() : ''}
              />
            </View>
          }
          { theCard.sentences && ! editing &&
            <View>
              <H2>Sentences</H2>
              {theCard.sentences.map((sent, i) => 
                <Text key={i}>{sent}</Text>
              )}
            </View>
          }
        </View>
          {/* { editing 
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
          } */}
        </Content>
        {/* <FloatingActionButton onPress={() => {
          this.toggleEditing
          alert('editing')
          console.log('Editing', this.state.editing)
        }}/> */}
        <Fab
          // active={this.state.active}
          // direction={this.props.direction || "up"}
          // containerStyle={{ }}
          style={ editing ? { backgroundColor: pink300 } : { backgroundColor: teal500 }}
          position={'bottomRight'}
          onPress={() => {
            this.setState({editing: !this.state.editing})
          }}
        >
          { editing 
            ? <Icon name="checkmark" />
            : <Icon name="create" />
          }
        </Fab>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardButtons: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    left: 10,
    right: 10,
    justifyContent: 'space-between'
  }
})

function mapStateToProps(state, { navigation }) {
  const { id } = navigation.state.params
  const card = state.cards.cards.filter((card) => {
    if ( card.id === id ) {
      return card
    }
  })
  return {
    card: card,
    cards: state.cards.cards
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
