import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import { Asset, AppLoading, SplashScreen } from 'expo'
import firebase from 'firebase'
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from './utils/_config'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Thunk from 'redux-thunk'

import { Navigation } from './components/shared/Navigation'
import Loader from './components/shared/Loader'
import Login from './components/views/Login'
import Splash from './components/views/Splash'
import middleware from './middleware'
import reducer from './reducers'

const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  middleware
)
// const store = createStore(reducer)

class App extends Component {
  state = {
    fontLoaded: false,
    authedUser: null,
    loggedIn: true,
    nightMode: false,
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

    firebase.auth().onAuthStateChanged((user) => {
      if ( user ) {
        this.setState({
          loggedIn: true,
          authedUser: user
        })
      } else {
        this.setState({
          loggedIn: false,
          authedUser: null
        })
      }
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

  renderInitialView() {
    switch( this.state.loggedIn ) {
      case true: 
        return <Navigation />
      case false: 
        // return <Login />
        return <Navigation />
      default: 
        return <Loader />
    }
  }

  render() {
    if ( ! this.state.fontLoaded ) {
      return null;
    }

    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          {this.renderInitialView()}
        </View>
      </Provider>
    )
  }
}

export default App