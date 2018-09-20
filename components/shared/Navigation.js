import React from 'react'
import { Platform, View, Text, Image } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Tabs, Button, Icon } from 'native-base'
import Loader from '../shared/Loader'
import About from '../views/About'
import AddCard from '../views/AddCard'
import AddDeck from '../views/AddDeck'
import CardList from '../views/CardList'
import DeckList from '../views/DeckList'
import DeckSingle from '../views/DeckSingle'
import Login from '../views/Login'
import Quiz from '../views/Quiz'
import { tealA700, tealA400, white } from '../../utils/colors'

const appTabs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) =>
        <Icon name = 'apps' />
    }
  },
  CardList: {
    screen: CardList,
    navigationOptions: {
      tabBarLabel: 'Cards',
      tabBarIcon: ({ tintColor }) =>
        <Icon name = 'albums' />
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      tabBarLabel: 'Quiz',
      tabBarIcon: ({ tintColor }) =>
        <Icon name = 'play' />
    }
  }
}

const appTabsOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? tealA700 : white,
    inactiveTintColor: Platform.OS === 'ios' ? tealA400 : white,
    swipeEnabled: true,
    style: {
      height: 56,
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
  About: About,
  Login: Login,
  DeckSingle: DeckSingle
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    title: 'Korean by heart',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: tealA700
    }, 
    headerRight: (
      <Button transparent
        onPress={({navigate}) => navigation.navigate('Login')}
      >
        { Platform === 'ios'
          ? <Icon name="ios-person" style={{color: 'white'}}/>
          : <Icon name="md-person" style={{color: 'white'}}/>
        }
      </Button>
    )
  }
})

export const Navigation = createSwitchNavigator(
  {
    // AuthLoading: Loader,
    App: MainNav,
    Auth: AuthNav
  }
)