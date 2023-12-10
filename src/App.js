import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AdminLoginScreen from './screens/AdminLoginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminSignUpScreen from './screens/AdminSignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import store from './redux/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AdminHome from './screens/AdminHome';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './common/FireStoreapp';
import { AuthUpdate } from './redux/AuthSlice';


const stack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();

const HospitalStack = createNativeStackNavigator()


const AppNavigator = () => {
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


const AppNavigator2 = () => {


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
  const {user, initializing} = useSelector((state)=>state.Auth1)
  const dispatch = useDispatch();

  console.log(initializing);

  function onAuthStateChanged(user) {
    console.log(user);
    dispatch(AuthUpdate({ prop: 'user', value: user }))
    if (initializing) dispatch(AuthUpdate({ prop: 'initializing', value: false }));
  }
  
  console.log(initializing);

useEffect(()=>{
  const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;

},[])

if (initializing) return null;

  return (
   
      user ? 
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      :
      <NavigationContainer>
        <AppNavigator2 />
      </NavigationContainer>

    
  )
}

export default App

const styles = StyleSheet.create({})