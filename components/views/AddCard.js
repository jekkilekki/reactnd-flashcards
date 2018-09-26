import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Container, Content, H1, H2, H3, Form, Item, Icon, Button, Label, Input, Picker, Textarea } from 'native-base'
import CardList from './CardList'
import { handleNewCard } from '../../actions/cards'
import { generateUID } from '../utils/helpers'
import { tealA700, purple700, pink300, white } from '../../utils/colors'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    // const deckName = navigation.state.params.deckName
    //   ? navigation.state.params.deckName + ' Deck'
    //   : 'Dictionary'
    // return {
    //   title: `Add Card to ${deckName}`
    // }
    return {
      title: 'Add New Card'
    }
  }

  state = {
    cardId: generateUID(),
    cardKor: '',
    cardEng: '',
    cardImg: '',
    cardPOS: '',
    cardSents: []
  }

  _submitForm = () => {
    const { navigation, dispatch } = this.props
    const { cardId, cardKor, cardEng, cardImg, cardPOS, cardSents } = this.state

    try {
      dispatch( handleNewCard( cardId, cardKor, cardEng, cardImg, cardPOS ))
      this.setState({
        cardId: '',
        cardKor: '',
        cardEng: '',
        cardImg: '',
        cardPOS: '',
        cardSents: []
      })
      navigation.navigate('CardList')
    } catch (e) {
      console.log('Error adding Card.', e.message)
    }
  }

  render() {
    // const { decks, navigation } = this.props
    // const deckName = navigation.state.params.deckName
    //   ? navigation.state.params.deckName
    //   : ''

    return (
      <Container>
        <Content>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Image</Label>
              <Input 
                value={this.state.cardImg}
                onChangeText={(text) => this.setState({cardImg: text})}
              />
            </Item>
            <Item noIndent floatingLabel>
              <Label>Front (Korean)</Label>
              <Input 
                value={this.state.cardKor}
                onChangeText={(text) => this.setState({cardKor: text})}
              />
            </Item>
            <Item noIndent floatingLabel>
              <Label>Back (English)</Label>
              <Input 
                value={this.state.cardEng}
                onChangeText={(text) => this.setState({cardEng: text})}
              />
            </Item>
            <Item noIndent>
              <Textarea style={{flex: 1}} rowSpan={5} bordered 
                placeholder="Example Sentence" 
                value={this.state.cardSent}
                onChangeText={(text) => this.setState({cardSent: text})}  
              />
            </Item>

            <Button block 
              style={[styles.button]}
              onPress={() => {
                this._submitForm()
                // alert('Adding your card:\n' + this.state.cardImg.toString() + '\n' + this.state.cardKor + '\n' + this.state.cardEng + '\n' + this.state.cardDeck + '\n' + this.state.cardSent)
                // console.log('Adding your card:\n' + this.state.cardImg.toString() + '\n' + this.state.cardKor + '\n' + this.state.cardEng + '\n' + this.state.cardDeck + '\n' + this.state.cardSent)
              }}
            >
              <Text style={styles.buttonText}>
                Add New Card
              </Text>
            </Button>
          </Form>
          {/* <CardList addCards={true} deck={deckName}/> */}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: tealA700,
  },
  buttonText: {
    color: white,
    fontSize: 18,
  },
})

function mapStateToProps(state) {
  return {
    decks: state.decks.decks
  }
}

export default connect(mapStateToProps)(AddCard)