import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { signUp } from '../redux/ActionCreater';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUpdate, selectedConditionsSlice, selectedConditionsUpdate } from '../redux/AuthSlice';
import { auth } from '../common/FireStoreapp';


const AdminSignUpScreen = ({navigation}) => {
  
  const dispatch = useDispatch()
  
  
  const {email, password,
  mobileNumber,
  hemophiliaOrThalassemia, 
  hospitalName,
  district,
  taluka,
  isConditionModalVisible,
  selectedConditions,
} = useSelector((state) => state.Auth1);

  const conditions = ['Hemophilia A', 'Hemophilia B', 'Thalassemia'];

  const toggleConditionModal = () => {
    dispatch(AuthUpdate({ prop: 'isConditionModalVisible', value: !isConditionModalVisible }))
  };

  const handleOkPress = () => {
    // Add any logic you need when the "OK" button is pressed
    // For now, we'll just close the modal
    toggleConditionModal();
  };

  const handleConditionPress = (condition) => {
    if (selectedConditions.includes(condition)) {
      // Condition already selected, remove it
      const index = selectedConditions.indexOf(condition);
    
      dispatch(selectedConditionsSlice(index))
    } else {
      // Condition not selected, add it
      
      dispatch(selectedConditionsUpdate(condition))
    }    
  };


  const onPressSignUp = () => {
    // Handle signup operation
    signUp(email, password, navigation, dispatch)
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'email', value: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'password', value: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Mobile Number"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'mobileNumber', value: text }))}
          />
        </View>

        <TouchableOpacity onPress={toggleConditionModal} style={styles.inputView}>
          <Text style={styles.inputText}>Select Conditions</Text>
        </TouchableOpacity>

        <Modal isVisible={isConditionModalVisible} onBackdropPress={toggleConditionModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Conditions</Text>
            {conditions.map((condition) => (
              <TouchableOpacity
                key={condition}
                style={styles.conditionItem}
                onPress={() => handleConditionPress(condition)}
              >
                <Text style={styles.conditionText}>{condition}</Text>
                {selectedConditions.includes(condition) ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : null}
              </TouchableOpacity>
            ))}

            {/* OK button to close the modal */}
            <TouchableOpacity onPress={handleOkPress} style={styles.okButton}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Hospital Name"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'hospitalName', value: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="State"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'state', value: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="District"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'district', value: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Taluka"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'taluka', value: text }))}
          />
        </View>

        <TouchableOpacity onPress={onPressSignUp} style={styles.loginBtn}>
          <Text style={styles.loginText}>Sign UP </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    height:800
  },
  container: {
    flex: 1,
    backgroundColor: '#4FD3DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#3AB4BA',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgotAndSignUpText: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
modalContainer: {
    backgroundColor: '#4FD3DA',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fb5b5a',
    marginBottom: 20,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  conditionText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  okButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Adjust as needed
  },
  okButtonText: {
    color: 'white',
  },
});

export default AdminSignUpScreen;
