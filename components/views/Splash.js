import React from 'react'
import { View, ImageBackground, Text, StyleSheet } from 'react-native'
import { H1 } from 'native-base'
import { teal500, white } from '../../utils/colors'
import Loader from '../shared/Loader'

const Splash = () => {
  console.log( "Splash" )
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/img/app-screen-medium.jpg')} 
        style={{width: '100%', height: '100%'}}
      >
        <H1 style={styles.welcome}>Welcome to Korean by Heart!</H1>
        <Loader />
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
    color: white
  }
})
 
export default Splash