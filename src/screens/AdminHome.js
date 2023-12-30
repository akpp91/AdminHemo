import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { getFirestore, collection, doc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../common/FireStoreapp';
import { getAuth } from 'firebase/auth';
import { logoutSuccess } from '../redux/AuthSlice';
import { Button, Card } from '@rneui/themed';
import NetInfo from '@react-native-community/netinfo';
import { LogBox } from 'react-native';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';

const AdminHome = () => {
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [userResponses, setUserResponses] = useState({});
  const [medicineAvailabilityText, setMedicine] = useState("");
  const netInfo = NetInfo.useNetInfo();
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const [isNetAvailable, setisNetAvailable] = useState(null);
  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Is connected?", state.isConnected);
      setisNetAvailable(state.isConnected)
      // You can use state.isConnected to check the current internet connectivity status
      // Handle your logic based on the connection status
     if (!state.isConnected) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `No internet connection. Please turn on your internet`,
      });
     } 
     
     else {
      try {

        const fetchunsubscribe = onSnapshot(doc(db, 'AdminUsers', auth.currentUser.email), (snapshot) => {
          const userConditions = snapshot.data()?.conditions || [];
          setConditions(userConditions);
          setMedicine(userConditions.isMedicineAvailable ? "Yes" : "No");
        });
        // To stop listening when needed
        return ()=> fetchunsubscribe()
  
      } catch (error) {
        console.log(error);
      }  
     }
      
    });

    return () => unsubscribe();

  },[])
  



  const fetchConditions = async () => {
    try {
      const userDocRef = doc(db, 'AdminUsers', auth.currentUser.email);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        const userConditions = snapshot.data()?.conditions || [];
        setConditions(userConditions);
      }
    } catch (error) {
      console.error('Error fetching conditions from Firestore:', error);

      // Show an error toast
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error fetching conditions from Firestore',
      });
    }
  };
  

  const handleResponse = async (response) => {
    const isConnected = await checkInternetConnectivity();
  
    if (!isConnected) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `No internet connection. Please turn on your internet`,
      });
      return;
    }
  
    try {
      // Find the index of the selected condition in the conditions array
      const index = conditions.findIndex((condition) => condition.condition === selectedCondition);
  
      // Update the isMedicineAvailable property in the conditions array
      const updatedConditions = [...conditions];
      updatedConditions[index] = { ...updatedConditions[index], isMedicineAvailable: response };
  
      // Update the local state immediately (optimistically)
      setConditions(updatedConditions);
  
      // Now, call handleSaveResponse asynchronously
      await handleSaveResponse(response);
  
      // If handleSaveResponse is successful, the state has already been updated
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error handling response',
      });
    } finally {
      setSelectedCondition(null);
    }
  };
  

  const handleSaveResponse = async (response) => {
    
    const isConnected = await checkInternetConnectivity();

      if (!isConnected) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `No internet connection. Please turn on your internet`,
        });
        return;
      }

      else{
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
    
          // Show a toast when the condition gets successfully updated
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: `Medicine Availability for ${selectedCondition} updated successfully`,
          });
          
          // Fetch conditions after updating to reflect changes
          await fetchConditions();
    
          
    
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
      }
  };
 
  const checkInternetConnectivity = async () => {
    try {
      const netInfoState = await NetInfo.fetch();
      return netInfoState.isConnected;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  LogBox.ignoreLogs(['@firebase/firestore']);

  return (
    <Card style={styles.container}>
      <ScrollView>
    <View >
    <Card.Title>Answer the following questions:</Card.Title>
    <Card.Divider/>

      
      
      {conditions.map((condition, index) => (
        <View key={index} style={styles.conditionContainer}>
          <Text style={styles.conditionText}>{`Is Factor Available for ${condition.condition}:`}</Text>
          
          <CardDivider/>

          {condition.isMedicineAvailable ? (
            <Text style={styles.availableText}>Yes</Text>
          ) : (
            <Text style={styles.notAvailableText}>No</Text>
          )}

          <CardDivider/>
          {selectedCondition === condition.condition ? (
            <View style={styles.buttonContainer}>
              {isLoading ? ( // Display spinner if loading
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <>
                  <Button title="Yes" onPress={() => handleResponse(true)} />
                  <Button title="No" onPress={() => handleResponse(false)} />
                </>
              )}
            </View>
          ) : (
            <Button title={`Update for ${condition.condition}`} onPress={() => setSelectedCondition(condition.condition)} />
          )}
          
          <CardDivider style={{width:"80%",margin:20 }}/>
        </View>
        
      ))}
      
      <Toast />
    </View>
    </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  conditionContainer: {
    marginBottom: 16,
  },
  conditionText: {
    fontSize: 21,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  availableText:{
    fontSize: 21,
    borderColor:'black',
    marginBottom: 8,
  },
  notAvailableText: {
    fontSize: 21,
    marginBottom: 8,
    justifyContent: 'flex-end',
    alignItems: 'center', // Add this line to center the text vertically
  }
  
});

export default AdminHome;
