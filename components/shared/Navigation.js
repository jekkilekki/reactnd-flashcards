import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Container, Tab, Tabs, Footer, FooterTab, Button, Icon, Text } from 'native-base'
import DeckList from '../views/DeckList'
import CardList from '../views/CardList'

class Navigation extends Component {
  render() {
    return (
      <Container>
      { Platform === 'ios' 
        ? <Footer>
            <FooterTab>
              <Button vertical>
                <Icon name='apps' />
                <Text>Apps</Text>
              </Button>
              <Button vertical>
                <Icon name="camera" />
                <Text>Camera</Text>
              </Button>
              <Button vertical>
                <Icon active name="navigate" />
                <Text>Navigate</Text>
              </Button>
            </FooterTab>
          </Footer>
        : <Tabs>
          <Tab heading="Decks">
            <DeckList />
          </Tab>
          <Tab heading="Cards">
            <CardList />
          </Tab>
        </Tabs>
      }
      </Container>
    )
  }
}

export default Navigation

export const Tabs = createMaterialTopTabNavigator({
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