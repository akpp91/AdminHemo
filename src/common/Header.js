import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.viewText}>{props.headerText}</Text>
    </View>
  )
}

export {Header} 

const styles = StyleSheet.create({
    viewStyle:{
backgroundColor:'#F8F8F8',
justifyContent:"center",
alignItems:"center",
shadowColor:'black',
shadowOffset:{width:0,height:1},
shadowOpacity:1,
elevation:10,
position:'relative'
    },
    viewText:
    {
        fontSize:30
    }
})