import React, { Component } from 'react'
import { Fab, Button, Icon } from 'native-base'
import { pink500 } from '../../utils/colors'

class FloatingAddButton extends Component {
  state = {
    active: false
  }

  render() {
    return (
      <Fab
        active={this.state.active}
        direction="up"
        containerStyle={{ }}
        style={{ backgroundColor: pink500 }}
        position="bottomRight"
        onPress={() => this.setState({ active: !this.state.active })}>
        <Icon name="add" />
        <Button style={{ backgroundColor: '#34A34F' }}>
          <Icon name="create" />
        </Button>
        <Button disabled style={{ backgroundColor: '#DD5144' }}>
          <Icon name="trash" />
        </Button>
      </Fab>
    )
  }
}

export default FloatingAddButton