import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Icon, Label, Button } from 'native-base'
import Nav from '../shared/Nav'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <Container>
        {/* <Nav headerTitle='Login'/> */}
        <Content padder>
          <Image source={{uri: '../../assets/img/k2k-gold-logo.png'}} />
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              {/* <Icon active name='ios-log-in' /> */}
              <Input 
                value={this.state.email}
                onChange={(e) => this.setState({ email: e })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input 
                value={this.state.email}
                onChange={(e) => this.setState({ password: e })}
              />
              <Icon active name='eye' />
            </Item>
            <Button block>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default Login