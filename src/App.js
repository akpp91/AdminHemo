import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminLoginScreen from './screens/AdminLoginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminSignUpScreen from './screens/AdminSignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import store from './redux/store';
import { Provider } from 'react-redux';
import AdminHome from './screens/AdminHome';


const stack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();

const HospitalStack = createNativeStackNavigator()


const AppNavigator = ({ auth, db }) => {
  return (
    <AuthStack.Navigator initialRouteName='AdminLoginScreen'>

      <AuthStack.Screen name='AdminLoginScreen'
        component={AdminLoginScreen}
        options={{
          title: "Admin Login"
        }} />

      <AuthStack.Screen name='AdminSignUpScreen'
        component={AdminSignUpScreen}
        options={{
          title: "AdminSignUpScreen"
        }} />

    </AuthStack.Navigator>
  );
};


const AppNavigator2 = ({ auth, db }) => {
  return (
    <HospitalStack.Navigator initialRouteName='AdminHome'>

      <HospitalStack.Screen name='AdminHome'
        component={AdminHome}
        options={{
          title: "AdminHome"
        }} />


    </HospitalStack.Navigator>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})