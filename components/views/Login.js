import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
                type='text'
                value={this.state.email}
                onChange={(e) => this.setState({ email: e })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
                type='password'
                value={this.state.email}
                onChange={(e) => this.setState({ password: e })}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default Login