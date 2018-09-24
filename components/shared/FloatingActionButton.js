import React, { Component } from 'react'
import { Fab, Button, Icon } from 'native-base'
import { pink500 } from '../../utils/colors'

class FloatingAddButton extends Component {
  state = {
    active: false
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
        onPress={() => this.setState({ active: !this.state.active })}>
        <Icon name="add" />
        
          <Button 
            style={{ backgroundColor: '#34A34F' }}
            onPress={() => navigation.navigate(destOne)}
          >
            <Icon name={this.props.iconOne} />
          </Button>
          <Button 
            style={{ backgroundColor: '#DD5144' }}
            onPress={() => navigation.navigate(destTwo)}  
          >
            <Icon name={this.props.iconTwo} />
          </Button>
      </Fab>
    )
  }
}

export default FloatingAddButton