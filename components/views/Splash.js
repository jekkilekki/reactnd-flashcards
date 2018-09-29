import React from 'react'
import { View, ImageBackground, Text, StyleSheet } from 'react-native'
import { teal500, white } from '../../utils/colors'
import Login from './Login'

const Splash = () => {
  console.log( "Splash" )
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/img/app-screen-medium.jpg')} 
        style={{width: '100%', height: '100%'}}
      >
        <Text style={styles.welcome}>Welcome to Key To Korean's Flashcards App!</Text>
        <Login />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: teal500
  },
  logo: {

  },
  welcome: {
    textAlign: 'center',
    fontSize: 20,
    color: white
  }
})
 
export default Splash