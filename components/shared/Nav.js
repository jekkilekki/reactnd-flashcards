import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base'
import { teal500 } from '../../utils/colors'

class Nav extends Component {
  render() {
    const { headerTitle } = this.props

    return (
      <Header backgroundColor={teal500}>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>{headerTitle}</Title>
        </Body>
        <Right />
      </Header>
    )
  }
}

export default Nav