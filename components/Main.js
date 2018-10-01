import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Platform, AsyncStorage } from 'react-native'
import { Asset, AppLoading, SplashScreen } from 'expo'
import firebase from 'firebase'
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from '../utils/_config'

import { Navigation } from './shared/Navigation'
import Loader from './shared/Loader'
import Login from './views/Login'
import { handleInitialData } from '../actions/shared'
import { setDecks } from '../actions/decks'
import { setCards } from '../actions/cards'

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

    // Make sure Expo fonts are loaded
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ fontLoaded: true })

    // Need to deal with Cards here also
    const decks = await AsyncStorage.getItem( 'KBH:Decks' ).then((results) => JSON.parse(results))
    const cards = await AsyncStorage.getItem( 'KBH:Cards' ).then((results) => JSON.parse(results))
    
    // Should probably handle some conditional checks here - just in case decks OR cards are missing
    if ( decks && cards ) {
      // console.log( "Setting up our decks...", decks )
      this.props.setDecks( decks )
      // console.log( "Setting up our cards...", cards )
      this.props.setCards( cards )
      this.setState({ dataLoaded: true })
    } else {
      let data = new Promise((res, rej) => {
        this.props.handleInitialData()
      })
      data.then(() => {
        this.setState({ dataLoaded: true })
      })
    }
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
    const { decks, cards } = this.props

    // If the data isn't yet loaded, show nothing
    if ( !this.state.fontLoaded ) {
      return null
    }

    if ( !this.state.dataLoaded ) {
      return <Loader />
    }

    // if ( decks === undefined || decks === 'undefined' || decks === null 
    //   || cards === undefined || cards === 'undefined' || cards === null ) {
    //   return <Loader />
    // }

    console.log( "Main" )
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

export default connect(mapStateToProps, {handleInitialData, setDecks, setCards})(Main)