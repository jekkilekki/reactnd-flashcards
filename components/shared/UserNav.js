import React, { Component } from 'react'
import { Text, Platform } from 'react-native'
import { Button, Icon } from 'native-base'

class UserNav extends Component {
  render() {
    return (
      <Button transparent>
        { Platform === 'ios'
          ? <Icon name="ios-person" />
          : <Icon name="md-person" />
        }
      </Button>
    )
  }
}

export default UserNav