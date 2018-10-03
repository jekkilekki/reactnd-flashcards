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

  _backToHome = () => {
    const { navigation } = this.props
    navigation.navigate('DeckSingle', { name: this.props.navigation.state.params.id })
  }

  render() {
    console.log( "QuizResults" )

    const { navigation, deck } = this.props
    const { set, name, view } = navigation.state.params
    const title = view === 'quiz' ? 'Quiz' : 'Study'
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