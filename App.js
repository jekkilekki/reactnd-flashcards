import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import reducer from './reducers'
// import { setLocalNotification } from './utils/helpers'
import { teal500, teal900, teal200 } from './utils/colors'
import { LinearGradient } from 'expo'

function FlashStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  componentDidMount() {
    // setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <FlashStatusBar backgroundColor={teal500} barStyle='light-content' />
          <LinearGradient
            colors={[teal500, teal900]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 300,
            }}
          />
          <Image style={[styles.logo]} source={require('./assets/img/k2k-logo-gold.png')} />
          <Text style={[styles.container, {textAlign: 'center'}]}>Splash Screen Logo</Text>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: 100,
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  }
});
