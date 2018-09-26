import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Container, Content, H1, H2, H3, Form, Item, Icon, Button, Label, Input, Picker, Textarea } from 'native-base'
import CardList from './CardList'
import { tealA700, purple700, pink300, white } from '../../utils/colors'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add Card to ${navigation.state.params.deckName} Deck`
    }
  }

  state = {
    cardImg: '',
    cardKor: '',
    cardEng: '',
    cardSent: ''
  }

  render() {
    const { decks } = this.props

    return (
      <Container>
        <Content>
          <Form style={styles.form}>
            {/* <Item floatingLabel>
              <Label>Image</Label>
              <Input 
                onChange={(text) => this.setState({cardImg: text})}
              />
            </Item> */}
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
                Add New Card
              </Text>
            </Button>
          </Form>
          <CardList addCards={true} deck={this.props.navigation.state.params.deckName}/>
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
    decks: state.decks
  }
}

export default connect(mapStateToProps)(AddCard)