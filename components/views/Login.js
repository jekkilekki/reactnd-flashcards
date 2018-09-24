import React, { Component } from 'react'
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Icon, Label, Button } from 'native-base'
import { white, teal500, error } from '../../utils/colors'
import firebase from 'firebase'

// CRM
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'

// const LoginButton = MKButton.coloredButton()
//   .withText('Login')
//   .build()

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  onButtonPress = () => {
    const { email, password } = this.state
    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword( email, password )
      .then(this.onAuthSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
          .then(this.onAuthSuccess)
          .catch(this.onAuthFailed)
      })
  }

  onAuthSuccess = () => {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })
  }

  onAuthFailed = () => {
    this.setState({
      error: 'Authentication failed. Please try again.',
      loading: false
    })
  }

  renderLoader = () => {
    if ( ! this.state.assetsLoaded ) {
      return <Loader />
    }
  }

  render() {
    // const { fieldStyles, loginButtonArea, errorMessage } = this.styles

    return (
      <Container style={styles.container}>
        <ImageBackground
          source={require('../../assets/img/app-screen-medium.jpg')}
          style={{flex: 1, width: '100%', height: '100%'}}
        >
        <Content padder>
          <Image 
            source={require('../../assets/img/k2k-logo-gold.png')} 
            resizeMode='contain' 
            style={styles.logo}
          />
          <Text style={styles.errorMessage}>{this.state.error}</Text>
          <MKTextField
            text={this.state.email}
            onTextChange={email => this.setState({ email })}
            // textInputStyle={styles.fieldStyles}
            placeholder={'Email'}
            tintColor={MKColor.Teal}
          />
          <MKTextField
            text={this.state.password}
            onTextChange={password => this.setState({ password })}
            // textInputStyle={styles.fieldStyles}
            placeholder={'Password'}
            tintColor={MKColor.Teal}
            password={true}
          />
          <Button block style={styles.button}>
            <Text style={styles.buttonText} onPress={this.onButtonPress.bind(this)}>
              Login
            </Text>
          </Button>
          <Button block style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText} onPress={this.onButtonPress.bind(this)}>
              Sign Up
            </Text>
          </Button>
        </Content>
        </ImageBackground>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingRight: 20,
    paddingLeft: 20
  },
  logo: {
    width: 200,
    alignSelf: 'center'
  },
  form: {
    paddingBottom: 10,
    width: 200,
  },
  fieldStyles: {
    height: 40,
    color: MKColor.purple,
    width: 200,
  },
  loginButtonArea: {
    marginTop: 20,
  },
  errorMessage: {
    backgroundColor: error,
    alignSelf: 'center'
  },
  button: {
    marginTop: 10,
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