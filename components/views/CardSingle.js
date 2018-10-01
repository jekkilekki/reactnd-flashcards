import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ImageBackground, StyleSheet, TextInput } from 'react-native'
import { Container, Content, H1, H2, H3, Card, CardItem, Button, Fab, Icon, Textarea } from 'native-base'
import { tealA700, teal500, pink300, gray100 } from '../../utils/colors'
import { getPartOfSpeech } from '../../utils/helpers'

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
    console.log( "CardSingle" )

    const { card } = this.props
    const { editing } = this.state
    const theCard = card

    console.log( "Card here: ", card )

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
                  : <Button transparent><Text>Part of Speech: </Text>{getPartOfSpeech(theCard.partOfSpeech)}</Button>
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
        </Content>

        <Fab
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

function mapStateToProps({ cards }, { navigation }) {
  const { id } = navigation.state.params
  const cardArray = Object.keys(cards).map(i => cards[i])
  return {
    card: cardArray.find(c => c.id === id),
    cards
  }
}

// function mapDispatchToProps(dispatch, { navigation }) {
//   const { cardId } = navigation.state.params
//   return {
//     remove: () => dispatch(addEntry({
//       [cardId]: timeToString() === cardId
//         ? getDailyReminderValue()
//         : null
//     })),
//     goBack: () => navigation.goBack(),
//   }
// }

export default connect(mapStateToProps)(CardSingle)
