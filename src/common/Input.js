import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { emailChange } from '../../Redux/AuthSlice';
import { useDispatch } from 'react-redux';

const Input = ({ label, data, onChange,placeholder,secureTextEntry }) => {

  const { labelStyle , containerStyle} = styles;
  const dispatch =useDispatch();

  return (
    <View 
    style={ containerStyle}
    >
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        placeholder={`${placeholder}`}
        secureTextEntry={secureTextEntry}
        value={data}  
        onChangeText={onChange}
        style={styles.InputStyle}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  InputStyle:{
color:'#000',
paddingRight:5,
paddingLeft:5,
fontSize:18,
lineHeight:23,
flex:2,
paddingBottom:10
  },

  labelStyle:{
fontSize:22,
paddingTop:2,
paddingLeft:10,
flex:1
  },
  
  containerStyle:{

// flex:1,
flexDirection:'row',
alignItems:'center'
  },
  
})