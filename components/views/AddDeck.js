import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Container, Content, H1, H2, H3, Form, Item, Label, Input, Textarea, Button } from 'native-base'
import { handleNewDeck } from '../../actions/decks'
import { generateUID, timeToString } from '../../utils/helpers'
import { addDeckToStorage, removeDeckFromStorage } from '../../utils/api'
import { tealA700, purple700, pink300, white } from '../../utils/colors'

class AddDeck extends Component {
  static navigationOptions = {
    title: 'Add New Deck'
  }

  state = {
    deckId: generateUID(),
    deckImg: 'https://i.pinimg.com/236x/c8/cd/6d/c8cd6dd4d7212c33a79f0ad4c33b02ee.jpg',
    deckName: '',
    deckDesc: '',
    deckCards: []
  }

  _submitForm = () => {
    const { navigation, dispatch } = this.props
    const { deckId, deckImg, deckName, deckDesc, deckCards } = this.state
    const key = timeToString()
    
    try {
      // Update Redux
      dispatch( handleNewDeck( deckId, deckName, deckDesc, deckImg ))
      this.setState({
        deckId: '',
        deckImg: '',
        deckName: '',
        deckDesc: '',
        deckCards: []
      })
      // Navigate to Next screen
      navigation.navigate('AddCardsModal', { id: deckId, name: deckName })
      // Save to 'DB'
      // addDeckToStorage({ key, deck }) -> refactor like AddEntry in Udacifitness
    } catch (e) {
      console.log('Error adding Deck.', e.message)
    }
  }

  render() {
    console.log( "AddDeck" )

    return (
      <Container>
        <Content>
          <Form style={styles.form}>
            <Item noIndent floatingLabel>
              <Label>Image (Optional)</Label>
              <Input 
                value={this.state.deckImg}
                onChangeText={(text) => this.setState({deckImg: text})}
              />
            </Item>
            <Item noIndent floatingLabel>
              <Label>Deck Name</Label>
              <Input 
                value={this.state.deckName}
                onChangeText={(text) => this.setState({deckName: text})}
              />
            </Item>
            <Item noIndent>
              <Textarea style={{flex: 1}} rowSpan={5} bordered 
                placeholder="Deck Description" 
                value={this.state.deckDesc}
                onChangeText={(text) => this.setState({deckDesc: text})}
              />
            </Item>

            <Button block 
              style={[styles.button]}
              onPress={() => {
                this._submitForm()
              }}
            >
              <Text style={styles.buttonText}>
                Add New Deck
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    paddingBottom: 10,
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: tealA700,
  },
  buttonText: {
    color: white,
    fontSize: 18,
  },
})

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddDeck)