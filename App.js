import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Platform, StatusBar } from 'react-native'
import firebase from 'firebase'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import reducer from './reducers'
// import { setLocalNotification } from './utils/helpers'
import { teal500, teal900, teal200 } from './utils/colors'
import { AppLoading, Asset, Font, LinearGradient } from 'expo'
import Login from './components/views/Login'

/**
 * Work on Async font / asset loading + AppLoading
 * https: //github.com/GeekyAnts/NativeBase/issues/1466
 * https: //javascriptrambling.blogspot.com/2018/03/expo-icon-fonts-with-react-native-and.html
 * https: //docs.expo.io/versions/v29.0.0/guides/preloading-and-caching-assets
 * https: //docs.expo.io/versions/v29.0.0/guides/using-custom-fonts
 * https: //docs.expo.io/versions/v29.0.0/sdk/app-loading.html
 * 
 * Splash Screen
 * https: //docs.expo.io/versions/v29.0.0/guides/splash-screens
 */

function FlashStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font))
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export default class App extends Component {
  state = {
    assetsLoaded: false,
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAQCcCzM1EfWGePzS4o4RhOjfPcZ8CmBGE",
      authDomain: "k2kflashcards.firebaseapp.com",
      databaseURL: "https://k2kflashcards.firebaseio.com",
      projectId: "k2kflashcards",
      storageBucket: "k2kflashcards.appspot.com",
      messagingSenderId: "175054501148"
    })
  }

  componentDidMount() {
    // setLocalNotification()
  }

  configureStore = (initialState) => {
    const store = createStore(reducer, initialState)
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers/index')
        store.replaceReducer(nextRootReducer)
      })
    }
    return store
  }

  render() {
    return (
      <Provider store={this.configureStore}>
        <View style={{flex: 1}}>
          <FlashStatusBar backgroundColor={teal500} barStyle='light-content' />
          {/* <LinearGradient
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
          <Text style={[styles.container, {textAlign: 'center'}]}>Splash Screen Logo</Text> */}
          {
            this.state.assetsLoaded
              ? <Login />
              : <AppLoading 
                  startAsync={this._loadAssetsAsync}
                  onFinish={() => this.setState({ assetsLoaded: true })}
                  onError={console.warn}
                />
          }
          
        </View>
      </Provider>
    );
  }

  async _loadAssetsAsync() {
    const fontAssets = cacheFonts([
      require("native-base/Fonts/Roboto.ttf"),
      require("native-base/Fonts/Roboto_medium.ttf")
    ])
    // const imgAssets = cacheImages([])

    await Promise.all([...fontAssets, ...imgAssets])
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
