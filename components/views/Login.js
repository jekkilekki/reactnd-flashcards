import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../../actions/authedUser'
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Icon, Label, Button } from 'native-base'
import { white, teal500, tealA700, pink300, purple700, error } from '../../utils/colors'
import firebase from 'firebase'

// CRM
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'

// const LoginButton = MKButton.coloredButton()
//   .withText('Login')
//   .build()

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    headerRight: null
  }

  state = {
    uid: '',
    email: '',
    password: '',
    error: '',
    loading: false
  }

  _onLogin = () => {
    const { email, password } = this.state
    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword( email, password )
      .then(this._onAuthSuccess)
      .catch(this._onAuthFailed)
  }

  _onAuthSuccess = () => {
    const { currentUser } = firebase.auth()
    const uid = currentUser.uid
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })
    try {
      this.props.dispatch(setAuthedUser(currentUser.uid))
      console.log( 'Authentication succeeded.' )
      this.props.navigation.navigate('Home')
    } catch (e) {
      alert("Error logging you in.")
      console.log("Error logging you in.", e)
    }
  }

  _onAuthFailed = (e) => {
    console.log( 'Authentication failed.', e )
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
    const { navigation } = this.props

    return (
      <Container style={styles.container}>
        <ImageBackground
          source={require('../../assets/img/app-screen-medium.jpg')}
          style={{flex: 1, width: '100%', height: '100%'}}
        >
        <Content padder style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
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
            tintColor={tealA700}
          />
          <MKTextField
            text={this.state.password}
            onTextChange={password => this.setState({ password })}
            // textInputStyle={styles.fieldStyles}
            placeholder={'Password'}
            tintColor={tealA700}
            password={true}
          />
          <Button block 
            style={styles.button}
            onPress={this._onLogin}
            disabled={this.state.email === '' && this.state.password === ''}
          >
            <Text style={styles.buttonText}>
              Login
            </Text>
          </Button>
          <Button block 
            style={[styles.button, styles.buttonOutline]}
            onPress={() => navigation.navigate('SignUp')}  
          >
            <Text style={styles.buttonOutlineText}>
              Sign Up ☞
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
    color: purple700,
    width: 200,
  },
  loginButtonArea: {
    marginTop: 20,
  },
  errorMessage: {
    backgroundColor: pink300,
    alignSelf: 'center'
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: tealA700,
  },
  buttonOutline: {
    backgroundColor: white,
    borderColor: tealA700,
    borderWidth: 2
  },
  buttonText: {
    color: white,
    fontSize: 18,
  },
  buttonOutlineText: {
    color: tealA700,
    fontSize: 18
  }
})

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(Login)