import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { amber500 } from '../../utils/colors'

const Loader = ({ size }) => {
  console.log( "Loader" )
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={ size || 'large' } color={amber500} />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loader