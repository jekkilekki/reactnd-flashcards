import React from 'react'
import { Platform, View, Text, Image } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Tabs, Button, Icon } from 'native-base'
import About from '../views/About'
import AddCard from '../views/AddCard'
import AddDeck from '../views/AddDeck'
import AddCardsToDeck from '../views/AddCardsToDeck'
import CardList from '../views/CardList'
import DeckList from '../views/DeckList'
import DeckSingle from '../views/DeckSingle'
import CardSingle from '../views/CardSingle'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Quiz from '../views/Quiz'
import { tealA700, tealA400, white } from '../../utils/colors'

const appTabs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) =>
        <Icon name='apps' />
    }
  },
  CardList: {
    screen: CardList,
    navigationOptions: {
      tabBarLabel: 'Cards',
      tabBarIcon: ({ tintColor }) =>
        <Icon name='albums' />
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: ({ tintColor }) =>
        <Icon name='information-circle' />
    }
  }
}

const appTabsOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? tealA700 : white,
    inactiveTintColor: Platform.OS === 'ios' ? tealA400 : white,
    swipeEnabled: true,
    style: {
      height: Platform.OS === 'ios' ? 56 : 48,
      backgroundColor: Platform.OS === 'ios' ? white : tealA700,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
      shadowOpacity: 1
    }
  }
}

const TabbedNav = Platform.OS === 'ios'
  ? createBottomTabNavigator(appTabs, appTabsOptions) 
  : createMaterialTopTabNavigator(appTabs, appTabsOptions)

const AuthNav = createStackNavigator({ Login: Login })

const MainNav = createStackNavigator({
  Home: TabbedNav,
  Login: Login,
  SignUp: SignUp,
  DeckSingle: DeckSingle,
  CardSingle: CardSingle,
  AddDeck: AddDeck,
  AddCard: AddCard,
  Quiz: Quiz
}, {
  initialRouteName: 'Home',
  navigationOptions: ({navigation}) => {
    return ({
      title: 'Korean by heart',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: tealA700,
      }, 
      headerBackTitle: 'Back',
      headerRight: (
        <Button transparent
          onPress={() => navigation.navigate('Login')}
        >
          { Platform === 'ios'
            ? <Icon name="ios-person" style={{color: 'white'}}/>
            : <Icon name="md-person" style={{color: 'white'}}/>
          }
        </Button>
      )
    })
  }
})

const RootNav = createStackNavigator({
  Main: MainNav,
  AddCardsModal: AddCardsToDeck
}, {
  mode: 'modal',
  headerMode: 'none'
})

export const Navigation = createSwitchNavigator(
  {
    // AuthLoading: Loader,
    App: RootNav,
    Auth: AuthNav
  }, 
  {
    initialRouteName: 'App'
  }
)