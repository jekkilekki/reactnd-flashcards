import React, { Component } from 'react'
import { Text, Platform } from 'react-native'
import { Button, Icon } from 'native-base'

class UserNav extends Component {
  render() {
    return (
      <Button transparent>
        { Platform === 'ios'
          ? <Icon name="ios-power" />
          : <Icon name="md-power" />
        }
      </Button>
    )
  }
}

export default UserNav