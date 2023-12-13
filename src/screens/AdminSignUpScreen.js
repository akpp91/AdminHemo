import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import { signUp } from '../redux/ActionCreater';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUpdate, selectedConditionsSlice, selectedConditionsUpdate } from '../redux/AuthSlice';
import { auth, db } from '../common/FireStoreapp';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import Spinner from '../common/Spinner';

const AdminSignUpScreen = ({ navigation }) => {

  const dispatch = useDispatch()


  const { email,
    password,
    mobileNumber,
    state,
    hospitalName,
    district,
    taluka,
    isConditionModalVisible,
    selectedConditions,
    loading,

  } = useSelector((state) => state.Auth1);


  const conditions = [{ condition: 'Hemophilia A', isMedicineAvailable: false },
  { condition: 'Hemophilia B', isMedicineAvailable: false },
  { condition: 'Thalassemia', isMedicineAvailable: false }];

  const toggleConditionModal = () => {
    dispatch(AuthUpdate({ prop: 'isConditionModalVisible', value: !isConditionModalVisible }))
  };

  const handleOkPress = () => {
    // Add any logic you need when the "OK" button is pressed
    // For now, we'll just close the modal
    toggleConditionModal();
  };

  const handleConditionPress = (condition) => {
    // debugger;
    const isConditionSelected = selectedConditions.some(
      (item) => item.condition === condition
    );
    
    

    if (isConditionSelected) {
      // Condition already selected, remove it
      const index = selectedConditions.findIndex(
        (item) => item.condition === condition
      );
    
      dispatch(selectedConditionsSlice(index));
    } 
    
    else {
      
      // Condition not selected, add it
      dispatch(selectedConditionsUpdate(condition));
    }
  };



  const onPressSignUp = () => {

    dispatch(AuthUpdate({ prop: 'loading', value: true }))

    const missingFields = [];

    // Check each required field
    if (!email) {
      missingFields.push('Email');
    }

    if (!password) {
      missingFields.push('Password');
    }

    if (!mobileNumber) {
      missingFields.push('Mobile Number');
    } else if (mobileNumber.length !== 10) {
      // Check if the mobile number is exactly 10 digits long
      Alert.alert('Error', 'Mobile Number should be exactly 10 digits');
      dispatch(AuthUpdate({ prop: 'loading', value: false }))

      return;
    }

    if (!hospitalName) {
      missingFields.push('Hospital Name');
    }

    if (!state) {
      missingFields.push('State');
    }

    if (!district) {
      missingFields.push('District');
    }

    if (!taluka) {
      missingFields.push('Taluka');
    }

    if (selectedConditions.length === 0) {
      missingFields.push('Select Conditions');
    }

    // Check if any field is missing
    if (missingFields.length > 0) {
      // Construct the warning message
      const warningMessage = `Please fill in the following fields:\n\n${missingFields.join('\n')}`;

      // Show an alert with the warning message
      Alert.alert('Error', warningMessage);
      dispatch(AuthUpdate({ prop: 'loading', value: false }))

      return;
    }

    // Handle signup operation
    signUp(email, password, navigation, dispatch,
      selectedConditions,
      district,
      hospitalName,
      mobileNumber,
      taluka, 
      loading);

  };

  return (
    
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={email}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'email', value: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={password}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'password', value: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={mobileNumber}
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
                key={condition.condition}
                style={styles.conditionItem}
                onPress={() => handleConditionPress(condition.condition)}
              >
                <Text style={styles.conditionText}>{condition.condition}</Text>
                {selectedConditions.some(item => item.condition === condition.condition) ? (
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
            value={hospitalName}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'hospitalName', value: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="State"
            value={state}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'state', value: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={district}
            placeholder="District"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'district', value: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={taluka}
            placeholder="Taluka"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => dispatch(AuthUpdate({ prop: 'taluka', value: text }))}
          />
        </View>



        {loading ? (
          <Spinner />
        ) : (
          <TouchableOpacity onPress={onPressSignUp} style={styles.loginBtn}>
            <Text style={styles.loginText}>Sign UP</Text>
          </TouchableOpacity>
        )}

      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexGrow:1
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
