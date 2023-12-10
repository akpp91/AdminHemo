import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { CardSection } from './CardSection';
import Input from './Input';
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Spinner from './Spinner';
import { auth3 } from '../App';


const LoginForm = (props) => {
  debugger;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [state, setState] = useState({ loading: false });

  
  const onButtonPress = async () =>{

              

              setError(" ");
              setState({ loading: true });

              try {
                // Attempt to sign in
                await signInWithEmailAndPassword(auth3, email, password);
              
                // If successful, you can proceed with any post-login logic
                function loginSuccess(){
                  setEmail('');
                  setPassword('');
                  setState({ loading: false });
                }
                loginSuccess()
              
              } catch (signInError) {
                // If signing in fails, try to create a new account
                try {
                  await createUserWithEmailAndPassword(auth3, email, password);
                  // If account creation is successful, you can proceed with post-creation logic
                  loginSuccess()

                } catch (createError) 
                {
                  
                  AuthenticationFails(createError);
                  
                  // Handle account creation failure here
                }
              }
              function AuthenticationFails(createError) {
                setError("Authentication Failed");
                console.error("Error creating account:", createError);
                setEmail('');
                  setPassword('');
                  setState({ loading: false });
              }
  
  }

  const renderButton=()=>{
    const {loading} = state;
    
    if (loading) {
      return <Spinner size={'small'}/>      
    }
    return(
      <Button 
      
      value={props.value} 
      onButtonPress={onButtonPress}
      />
    )
  }

  return (
    <Card>
      <CardSection>
        <Input
          label="Email"
          placeholder="akshay@gmail.com"
          data={email}  
          onChange={(email) => {
            setEmail(email);
          }}
        />
      </CardSection>
      <CardSection>
      <Input
          secureTextEntry
          label="Password"
          placeholder="password"
          data={password}  
          onChange={(password) => {
            setPassword(password);
          }}
        />
      </CardSection>
      <Text style={styles.textStyle}>
        {error}
      </Text>
      <CardSection >
          {renderButton()}
      </CardSection>
    </Card>
  );
};

export default LoginForm;

const styles=StyleSheet.create({
  textStyle:{
    color:'red',
    fontSize:20,
    alignSelf:'center'
  }
  
})