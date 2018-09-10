import React, { Component } from 'react'
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base'
import { teal500 } from '../../utils/colors'

export default class HeaderExample extends Component {
  render() {
    const { headerTitle } = this.props

    return (
      <Container>
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
      </Container>
    )
  }
}