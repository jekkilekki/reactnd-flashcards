import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Container, Content, H1, H2, H3, Form, Item, Label, Input, Textarea, Button } from 'native-base'
import { handleNewDeck } from '../../actions/decks'
import { tealA700, purple700, pink300, white } from '../../utils/colors'

class AddDeck extends Component {
  static navigationOptions = {
    title: 'Add New Deck'
  }

  state = {
    deckImg: '',
    deckName: '',
    deckDesc: '',
    deckCards: []
  }

  _submitForm = () => {
    const { navigation, dispatch } = this.props
    const { deckImg, deckName, deckDesc, deckCards } = this.state
    
    try {
      dispatch( handleNewDeck( deckName, deckDesc, deckImg ))
      this.setState({
        deckImg: '',
        deckName: '',
        deckDesc: '',
        deckCards: []
      })
      navigation.navigate('DeckList')
    } catch (e) {
      console.log('Error adding deck.', e.message)
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Form style={styles.form}>
            {/* <Item noIndent floatingLabel>
              <Label>Image</Label>
              <Input 
                value={this.state.deckImg}
                onChangeText={(text) => this.setState({deckImg: text})}
              />
            </Item> */}
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
                // alert('Adding your deck')
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

function mapStateToProps(state) {
  // Maybe can map this to props this way? Instead of state in this Component?
  // const { deckImg, deckName, deckDesc, deckCards } = this.props
  return {
    // deckImg,
    // deckName,
    // deckDesc,
    // deckCards
    decks: state.decks.decks
  }
}

export default connect(mapStateToProps)(AddDeck)