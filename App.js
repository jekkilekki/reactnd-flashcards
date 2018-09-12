import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Asset, AppLoading, SplashScreen } from 'expo'
import firebase from 'firebase'
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from './utils/_config'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'

import Splash from './components/views/Splash'
import Nav from './components/shared/Nav'
import Login from './components/views/Login'
import reducer from './reducers'
import { teal500 } from './utils/colors'

function AppStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const store = createStore(reducer)

class App extends Component {
  state = {
    fontLoaded: false,
    authedUser: null
  }
  
  async componentWillMount() {
    firebase.initializeApp({
      apiKey: apiKey,
      authDomain: authDomain,
      databaseURL: databaseURL,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId
    })

    // SplashScreen.preventAutoHide();

    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ fontLoaded: true })
  }

  componentDidMount() {
    // setLocalNotification()
  }

  render() {
    if ( ! this.state.fontLoaded ) {
      return null;
    }

    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={teal500} barStyle='light-content' />
          <Splash />
        </View>
      </Provider>
    )
  }
}

export default App