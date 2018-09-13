import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Constants } from 'expo'
import { View, Platform, StatusBar } from 'react-native'
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base'
import { teal500 } from '../../utils/colors'
import UserNav from './UserNav'

function AppStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class Nav extends Component {
  render() {
    const { headerTitle, headerColor } = this.props
    let hColor = headerColor === null ? 'teal500' : headerColor

    return (
      <View>
        <AppStatusBar backgroundColor={hColor} barStyle='light-content' /> 
        <Header style={{backgroundColor: hColor}}>
          <Left>
            <Button transparent>
              { Platform === 'ios'
                ? <Icon name='ios-menu' />
                : <Icon name='menu' />
              }
            </Button>
          </Left>
          <Body>
            <Title>{headerTitle}</Title>
          </Body>
          <Right>
            <UserNav />
          </Right>
        </Header>
      </View>
    )
  }
}

export default connect()(Nav)