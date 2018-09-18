import React, { Component } from 'react'
import { Text, Platform, StyleSheet } from 'react-native'
import { Button, Icon } from 'native-base'
import { withNavigation } from 'react-navigation'

class UserNav extends Component {
  render() {
    return (
      <Button transparent
        onPress={() => this.props.navigation.navigate('Login')}
      >
        { Platform === 'ios'
          ? <Icon name="ios-person" style={styles.userIcon}/>
          : <Icon name="md-person" style={styles.userIcon}/>
        }
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  userIcon: {
    color: 'white',
    fontSize: 20
  }
})

export default withNavigation(UserNav)