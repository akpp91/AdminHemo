import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  )
}

export {CardSection} 

const styles = StyleSheet.create({
    containerStyle:{
        borderBottomWidth:1,
        padding:5,
        backgroundColor:'#fff',
        flexDirection:'column',
        justifyContent:'flex-start',
        borderColor:'#ddd',
        position:'relative'
    }
})