import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Header, Body, Title, Right, Button, Icon, Content, H1, H2, H3 } from 'native-base'

class QuizResults extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   const { name } = navigation.state.params
  //   return {
  //     title: `Results ${name}`,
  //   }
  // }
  state = {
    timeEnd: Date.now()
  }

  _restart = () => {
    const { navigation } = this.props
    const { id, name, set, know, cards, cardObj, view } = navigation.state.params
    navigation.goBack()
  }

  _backToHome = () => {
    const { navigation } = this.props
    navigation.navigate('DeckSingle', { name: navigation.state.params.name })
  }

  render() {
    console.log( "QuizResults" )

    const { navigation, deck } = this.props
    const { set, name, view, cards, cardObj, know, dontKnow, time } = navigation.state.params
    console.log( "Card Obj in Results: ", cardObj )

    const title = view === 'quiz' ? 'Quiz' : 'Study Session'
    const theDeck = deck

    return (
      <Container>
        
        <Header style={{backgroundColor: 'white'}}>
          <Body>
            <Title>{title} Results</Title>
          </Body>
          <Right>
            <Button transparent onPress={this._backToHome}>
              <Text>Finished</Text>
              <Icon name="close" style={{marginLeft: 5}}/>
            </Button>
          </Right>
        </Header>

        <Content>
          <View style={styles.padder}>
            <H3>Quiz Results</H3>
            <Text>You said you knew {know} cards out of {cards.length}.</Text>
            <Text>Good job! That means you scored { know / cards.length * 100 }%!</Text>
            <Text>It took {this.state.timeEnd - time}ms</Text>
            <View>
            <Button onPress={this._restart}>
              <Icon name="sync" />
              <Text>Restart {title}</Text>
            </Button>
            <Button onPress={this._backToHome}>
              <Icon name="home" />
              <Text>Back to Deck</Text>
            </Button>
            </View>
          </View>
        </Content>
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
  }
})

export default QuizResults