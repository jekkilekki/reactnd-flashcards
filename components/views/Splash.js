import React from 'react'
import { View, ImageBackground, Text, StyleSheet } from 'react-native'
import { H1 } from 'native-base'
import { tealA700, white } from '../../utils/colors'
import Loader from '../shared/Loader'

const Splash = () => {
  console.log( "Splash" )
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/img/app-screen-medium.jpg')} 
        style={[{width: '100%', height: '100%'}, styles.container]}
      >
        <View>
          <H1 style={styles.welcome}>Welcome to Korean by ❤️!</H1>
          <Loader />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tealA700
  },
  logo: {

  },
  welcome: {
    paddingTop: '75%',
    marginBottom: '-100%',
    textAlign: 'center',
    color: white
  }
})
 
export default Splash