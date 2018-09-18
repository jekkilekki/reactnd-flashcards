import React, { Component } from 'react'
import { Text } from 'react-native'
import { Container } from 'native-base'
import TopBar from '../shared/TopBar'
import { tealA700 } from '../../utils/colors'

class Quiz extends Component {
  render() {
    return (
      <Container style={{backgroundColor: 'white'}}>
        <TopBar headerTitle={"Quiz"} headerColor={tealA700}/>
        <Text>Quiz</Text>
      </Container>
    )
  }
}

export default Quiz