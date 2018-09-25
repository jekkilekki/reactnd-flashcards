import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Container, Content, H1, H2, H3, Form, Item, Icon, Button, Label, Input, Picker, Textarea } from 'native-base'
import { tealA700, purple700, pink300, white } from '../../utils/colors'

class AddCard extends Component {
  state = {
    cardImg: '',
    cardKor: '',
    cardEng: '',
    cardDeck: null,
    cardSent: ''
  }

  _onValueChange = () => {
    console.log('Selecting a deck now')
  }

  render() {
    const { decks } = this.props

    return (
      <Container>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Image</Label>
              <Input 
                onChange={(text) => this.setState({cardImg: text})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Front (Korean)</Label>
              <Input 
                onChange={(text) => this.setState({cardKor: text})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Back (English)</Label>
              <Input 
                onChange={(text) => this.setState({cardEng: text})}
              />
            </Item>
            <Item picker style={{flex: 1}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: '84%' }}
                placeholder="Add to Deck"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.cardDeck}
                onValueChange={this._onValueChange}
              >
                {/* {decks.map((deck) => {
                  <Picker.Item label={deck.id} value={deck.id} />
                })} */}
                <Picker.Item label="Beginner" value="key0" />
                <Picker.Item label="Intermediate" value="key1" />
                <Picker.Item label="Advanced" value="key2" />
              </Picker>
            </Item>
            <Item>
              <Textarea style={{flex: 1}} rowSpan={5} bordered 
                placeholder="Example Sentence" 
                onChange={(text) => this.setState({cardSent: text})}  
              />
            </Item>

            <Button block 
              style={[styles.button]}
              onPress={() => {
                console.log(this.state)
                alert('Adding your card:\n' + this.state.cardImg.toString() + '\n' + this.state.cardKor + '\n' + this.state.cardEng + '\n' + this.state.cardDeck + '\n' + this.state.cardSent)
                console.log('Adding your card:\n' + this.state.cardImg.toString() + '\n' + this.state.cardKor + '\n' + this.state.cardEng + '\n' + this.state.cardDeck + '\n' + this.state.cardSent)
              }}
            >
              <Text style={styles.buttonText}>
                Add Card
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
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(AddCard)