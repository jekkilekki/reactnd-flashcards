import React, { Component } from 'react'
import { Container, Content, H1, H2, H3, Button } from 'native-base'
import { Image, ImageBackground, View, Text, Linking } from 'react-native'
import { WebBrowser } from 'expo'
import Hyperlink from 'react-native-hyperlink'
import { tealA700 } from '../../utils/colors'

class About extends Component {
  render() {
    console.log( "About" )
    return (
      <Container>
        <Content padder>
          <H1>About</H1>
          <Hyperlink
            linkStyle={{ color: tealA700 }}
            linkText={(url) => url === 'https://en.wikipedia.org/wiki/Leitner_system' ? 'Sebastian Leitner' : url }
            onPress={(url) => Linking.openURL(url)}
          >
            <Text style={{paddingTop: 10, paddingBottom: 10}}>
              This App is modeled after the Spaced Repetition 
              System (SRS) designed by the German science journalist 
              https://en.wikipedia.org/wiki/Leitner_system in the 1970s.
            </Text>
          </Hyperlink>
          <Hyperlink
            linkStyle={{ color: tealA700 }}
            linkText={(url) => url === 'https://en.wikipedia.org/wiki/Spaced_repetition' ? 'Spaced Repetition Systems' : url }
            onPress={(url) => Linking.openURL(url)}
          >
            <Text>
              https://en.wikipedia.org/wiki/Spaced_repetition like the Leitner system 
              "incorporate increasing intervals of time between subsquent review of 
              previously learned material in order to exploit the psychological 
              spacing effect." [Wikipedia]
            </Text>
          </Hyperlink>
          <H2>Features</H2>
        </Content>
      </Container>
    )
  }
}

export default About