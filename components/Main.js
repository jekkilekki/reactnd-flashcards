import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Platform } from 'react-native'
import { Asset, AppLoading, SplashScreen } from 'expo'
import firebase from 'firebase'
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from '../utils/_config'

import { Navigation } from './shared/Navigation'
import Loader from './shared/Loader'
import Login from './views/Login'
import { handleInitialData } from '../actions/shared'

class Main extends Component {
  state = {
    fontLoaded: false,
    dataLoaded: false,
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
    let data = new Promise((res, rej) => {
      this.props.handleInitialData()
    })
    data.then(() => {
      this.setState({ dataLoaded: true })
    })
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
    const { decks, cards } = this.props

    if ( ! this.state.fontLoaded ) {
      return null;
    }

    if ( decks === undefined || decks === 'undefined' || decks === null 
      || cards === undefined || cards === 'undefined' || cards === null ) {
      return <Loader />
    }

    return (
      <View style={{flex: 1}}>
        {this.renderInitialView()}
      </View>
    )
  }
}

function mapStateToProps({decks, cards}) {
  return {
    decks,
    cards
  }
}

export default connect(mapStateToProps, {handleInitialData})(Main)