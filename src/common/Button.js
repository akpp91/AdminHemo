import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import { Card } from './Card';
import { CardSection } from './CardSection';
import { auth3 } from '../App';

const Button = ({value, email, password,onButtonPress}) => {
  const { loading} = useSelector((state) => state.Auth1);

  return (    
    
      loading
      ?
      <Card>
        <CardSection>
            <Spinner/> 
      </CardSection>
      </Card>
  :
  <TouchableHighlight activeOpacity={0.6}
  underlayColor="red"
  onPress={()=>{onButtonPress()} }
  style={styles.buttonStyle}
>
<Text 
style={styles.textStyle}
>
{value}
</Text>
</TouchableHighlight>

  
  
    
  
    
  )
}

export {Button} 

const styles = StyleSheet.create({
textStyle:{
alignSelf:'center',
color:'#007aff',
fontSize:16,
// fontWeight:'600',
marginTop:6
},
    buttonStyle:{

    // flex:1,
    alignSelf:'stretch',
    backgroundColor:'#fff',
    borderRadius:10,
    borderWidth:2,
    borderColor:'#007aff',
    height:40
}
})