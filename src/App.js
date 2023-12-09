import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminLoginScreen from './AdminLoginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminSignUpScreen from './AdminSignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import store from './redux/store';
import { Provider } from 'react-redux';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
<NavigationContainer>
<stack.Navigator initialRouteName='AdminLoginScreen'>

<stack.Screen name='AdminLoginScreen'
component={AdminLoginScreen}
options={{
title:"Admin Login"
}}/>

<stack.Screen name='AdminSignUpScreen'
component={AdminSignUpScreen}
options={{
title:"AdminSignUpScreen"
}}/>

</stack.Navigator>
</NavigationContainer>
</Provider>
  )
}

export default App

const styles = StyleSheet.create({})