import React from 'react'
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from './utils/_config'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { Provider } from 'react-redux'

import middleware from './middleware'
import reducer from './reducers'
import App from './components/App'

const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  composeWithDevTools( middleware )
  // middleware
)

ReactNative.render (
  <Provider store={store}>
    <View style={{flex: 1}}>
      <App />
    </View>
  </Provider>
)