import React, { Component } from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Container, Tab, Tabs, Footer, FooterTab, Button, Icon, Text } from 'native-base'
import DeckList from '../views/DeckList'
import CardList from '../views/CardList'
import AddDeck from '../views/AddDeck'
import AddCard from '../views/AddCard'
import Login from '../views/Login'
import Quiz from '../views/Quiz'
import TopBar from './TopBar'
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

export const TabbedNav = Platform.OS === 'ios'
  ? createBottomTabNavigator(appTabs, appTabsOptions) 
  : createMaterialTopTabNavigator(appTabs, appTabsOptions)

export const MainNav = createStackNavigator({
  Home: {
    screen: TabbedNav,
  },
  // Login: {
  //   screen: Login,
  //   navigationOptions: {
  //     title: 'Login/Signup',
  //     // header: <TopBar headerTitle={'Login'} />,
  //   }
  // }
})


export const TabsOriginal = createMaterialTopTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  CardList: {
    screen: CardList,
    navigationOptions: {
      tabBarLabel: 'Cards',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? tealA700 : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : tealA700,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  // EntryDetail: {
  //   screen: EntryDetail,
  //   navigationOptions: {
  //     headerTintColor: white,
  //     headerStyle: {
  //       backgroundColor: tealA700,
  //     }
  //   }
  // }
})