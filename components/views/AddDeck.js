import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Container, Content, H1, H2, H3, Form, Item, Label, Input, Textarea, Button } from 'native-base'
import * as actions from '../../actions'
import { tealA700, purple700, pink300, white } from '../../utils/colors'

class AddDeck extends Component {
  static navigationOptions = {
    title: 'Add a Deck'
  }

  state = {
    deckImg: '',
    deckName: '',
    deckDesc: '',
    deckCards: []
  }

  _submitForm = () => {
    const { navigation } = this.props
    const { deckImg, deckName, deckDesc, deckCards } = this.state
    this.props.addDeckFire({ deckImg, deckName, deckDesc, deckCards })
    this.setState({
      deckImg: '',
      deckName: '',
      deckDesc: '',
      deckCards: []
    })
    navigation.navigate('DeckList')
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item noIndent floatingLabel>
              <Label>Image</Label>
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
                alert('Adding your deck')
                // this._submitForm()
              }}
            >
              <Text style={styles.buttonText}>
                Add Deck
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  logo: {
    width: 200,
    alignSelf: 'center'
  },
  form: {
    paddingBottom: 10,
    width: 200,
  },
  fieldStyles: {
    height: 40,
    color: purple700,
    width: 200,
  },
  loginButtonArea: {
    marginTop: 20,
  },
  errorMessage: {
    backgroundColor: pink300,
    alignSelf: 'center'
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: tealA700,
  },
  buttonOutline: {
    backgroundColor: white,
    borderColor: tealA700,
    borderWidth: 2
  },
  buttonText: {
    color: white,
    fontSize: 18,
  },
  buttonOutlineText: {
    color: tealA700,
    fontSize: 18
  }
})

function mapStateToProps(state) {
  // Maybe can map this to props this way? Instead of state in this Component?
  const { deckImg, deckName, deckDesc, deckCards } = this.props
  return {
    deckImg,
    deckName,
    deckDesc,
    deckCards
  }
}

export default connect(mapStateToProps, actions)(AddDeck)