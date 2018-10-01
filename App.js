import React, { Component } from 'react'
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from './utils/_config'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { Provider } from 'react-redux'

import middleware from './middleware'
import reducer from './reducers'
import Main from './components/Main'

const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  // composeWithDevTools( middleware ) // Windows
  middleware
)

class App extends Component {

  componentDidMount() {
    // setLocalNotification()
  }

  render() {
    console.log( "App" )
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default App