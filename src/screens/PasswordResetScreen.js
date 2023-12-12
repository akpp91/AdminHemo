import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';


const PasswordResetScreen = () => {

    const auth = getAuth();

  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      // Send a password reset email
      await sendPasswordResetEmail(auth, email);

      // Show a success message
      Alert.alert('Password Reset', 'Check your email for a password reset link.');
    } catch (error) {
      // Handle password reset error
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter your email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Button title="Reset Password" onPress={handlePasswordReset} />
    </View>
  );
};

export default PasswordResetScreen;
