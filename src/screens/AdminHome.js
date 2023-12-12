import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { getFirestore, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../common/FireStoreapp';
import { getAuth } from 'firebase/auth';
import { logoutSuccess } from '../redux/AuthSlice';
import { Button } from '@rneui/themed';

const AdminHome = () => {
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [userResponses, setUserResponses] = useState({});
  const [isMedicineAvailable, setIsMedicineAvailable] = useState(false); // Local state for isMedicineAvailable
  const [medicineAvailabilityText, setMedicine] = useState("");

  useEffect(() => {
    // Fetch conditions from Firestore
    fetchConditions();
  },[auth.currentUser.email]); // Run this effect whenever the email changes

  const fetchConditions = async () => {
    try {
      const userDocRef = doc(db, 'AdminUsers', auth.currentUser.email);

      // Assuming 'conditions' is the field in AdminUsers storing the array of conditions
      const userDocSnapshot = await getDoc(userDocRef);
      const userConditions = userDocSnapshot.data()?.conditions || [];
      setConditions(userConditions);
      setMedicine(userConditions.isMedicineAvailable ? "Yes" : "No");

    } catch (error) {
      console.log(error);
    }
  };

  const handleResponse = async (response) => {
    
    try {

    // Find the index of the selected condition in the conditions array
    const index = conditions.findIndex((condition) => condition.condition === selectedCondition);

    // Update the isMedicineAvailable property in the conditions array
    const updatedConditions = [...conditions];
    updatedConditions[index] = { ...updatedConditions[index], isMedicineAvailable: response };

    // Update the local state immediately
    setConditions(updatedConditions);

    // Now, call handleSaveResponse asynchronously
      await handleSaveResponse(response);  
    } catch (error) {
      console.log(error);
      fetchConditions()
    setSelectedCondition(null);
    }
    
    
  };


  const handleSaveResponse = async (response) => {
    try {
      const userDocRef = doc(db, 'AdminUsers', auth.currentUser.email);

      // Update the Firestore database with the user's response and isMedicineAvailable
      await updateDoc(userDocRef, {
        conditions: conditions.map((condition) => {
          if (condition.condition === selectedCondition) {
            return { ...condition, isMedicineAvailable: response };
          }
          return condition;
        }),
      });

      // Fetch conditions after updating to reflect changes
      await fetchConditions();

      // Show a toast when the condition gets successfully updated
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Medicine Availability for ${selectedCondition} updated successfully`,
      });

      // Clear the selected condition and userResponses state after saving
      setUserResponses({});
      setSelectedCondition(null);
    } catch (error) {
      console.error('Error updating Firestore:', error);

      // Show an error toast
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error updating Firestore',
      });
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Answer the following questions:</Text>
      {conditions.map((condition, index) => (
        <View key={index} style={styles.conditionContainer}>
          <Text style={styles.conditionText}>{`Is Medicine Available for ${condition.condition}:`}</Text>
          {condition.isMedicineAvailable ? (
            <Text style={styles.availableText}>Yes</Text>
          ) : (
            <Text style={styles.notAvailableText}>No</Text>
          )}
          {selectedCondition === condition.condition ? (
            <View style={styles.buttonContainer}>
              <Button title="Yes" onPress={() => handleResponse(true)} />
              <Button title="No" onPress={() => handleResponse(false)} />
            </View>
          ) : (
            <Button
              title={`Update for ${condition.condition}`}
              onPress={() => setSelectedCondition(condition.condition)}
            />
          )}
        </View>
      ))}

      {/* Display the "Log Out" button if no condition is being edited */}
      {/* {selectedCondition === null && (
        <Button
          title="Log Out"
          onPress={() => {
            logoutSuccess();
            getAuth()
              .signOut()
              .then(() => Alert.alert('You signed out!'));
          }}
        />
      )} */}
     <Toast  />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  conditionContainer: {
    marginBottom: 16,
  },
  conditionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default AdminHome;
