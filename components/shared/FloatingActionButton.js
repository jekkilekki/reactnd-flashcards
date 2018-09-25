import React, { Component } from 'react'
import { Fab, Button, Icon } from 'native-base'
import { pink500 } from '../../utils/colors'

class FloatingAddButton extends Component {
  state = {
    active: false,
    loggedIn: false
  }

  render() {
    const { navigation, destOne, destTwo } = this.props

    return (
      <Fab
        active={this.state.active}
        direction={this.props.direction || "up"}
        containerStyle={{ }}
        style={{ backgroundColor: pink500 }}
        position={this.props.position || "bottomRight"}
        onPress={() => {
          if ( this.state.loggedIn ) {
            this.setState({ active: !this.state.active })
          } else {
            alert('Please login before editing the app.')
          } 
        }}
      >
        <Icon name="add" />
        
        { this.state.loggedIn && 
          <View>
          <Button 
            style={{ backgroundColor: '#34A34F' }}
            onPress={() => navigation.navigate(destOne || 'AddDeck')}
          >
            <Icon name={this.props.iconOne || 'apps'} />
          </Button>
          <Button 
            style={{ backgroundColor: '#DD5144' }}
            onPress={() => navigation.navigate(destTwo || 'AddCard')}  
          >
            <Icon name={this.props.iconTwo || 'albums'} />
          </Button>
          </View>
        }
      </Fab>
    )
  }
}

export default FloatingAddButton