import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Icon, Label, Button } from 'native-base'
import Nav from '../shared/Nav'
import { white, teal500 } from '../../utils/colors'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <Container>
        <Nav headerTitle='Login'/>
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
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
                value={this.state.email}
                onChange={(e) => this.setState({ password: e })}
              />
              <Icon active name='eye' />
            </Item>
            <Button block style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </Button>
            <Button block style={[styles.button, styles.buttonOutline]}>
              <Text style={styles.buttonOutlineText}>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: teal500,
  },
  buttonOutline: {
    backgroundColor: white,
    borderColor: teal500,
    borderWidth: 2
  },
  buttonText: {
    color: white,
    fontSize: 18,
  },
  buttonOutlineText: {
    color: teal500,
    fontSize: 18
  }
})

export default Login