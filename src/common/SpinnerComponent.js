// SpinnerComponent.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const SpinnerComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fb5b5a" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpinnerComponent;
