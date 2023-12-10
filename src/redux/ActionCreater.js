import { emailChange, loginSuccess, passwordChange, resetState, setLoadingFalse } from "./AuthSlice";
// import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

import { Alert } from "react-native";
import { employeeUpdate } from "./employeeSlice";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app, auth, db } from "../common/FireStoreapp";
import {   setAuth } from "./AuthSlice";

import { setDoc, doc, collection } from 'firebase/firestore';


// Function for Sign In
export async function signIn(auth, email, password, navigation, dispatch) {
  try {
    // Attempt to sign in
    const user = await signInWithEmailAndPassword(auth, email, password);

    // If successful, dispatch login success action
    dispatch(loginSuccess(user));
    dispatch(setLoadingFalse(false));

    // Proceed with any post-login logic
    console.log("signIn - where u wnat to go");
    // navigation.navigate('EmployeeList');
  } catch (signInError) {
    // Handle sign-in failure here
    console.error("Error signing in:", signInError);
    // You can add specific error handling or dispatch actions accordingly
  }
}

// Function for Sign Up
export async function signUp(email, password, navigation, dispatch,
  selectedConditions,
  district,
  hospitalName,
  mobileNumber,
  taluka) {

  try {
    // Attempt to create a new account
    const user = await createUserWithEmailAndPassword(auth , email, password);

    // If successful, dispatch login success action
    dispatch(loginSuccess(user));
    dispatch(setLoadingFalse(false));
    
    const userDocRef = doc(collection(db, "AdminUsers"), email);

    // Add user data to Firestore
    const userRef = await setDoc(userDocRef, {
      conditions: selectedConditions,
      district: district,
      email: email,
      hospitalName: hospitalName,
      mobileNumber: mobileNumber,
      password: password,
      taluka: taluka,
    });
    // Proceed with any post-creation logic

    dispatch(resetState())
    Alert.alert("registration successful ")
    navigation.navigate('AdminLoginScreen');
  } catch (createError) {
    // Handle account creation failure here
    AuthenticationFails(createError, dispatch);
  }
}

// Common function for handling authentication failures
function AuthenticationFails(createError, dispatch) {
  // dispatch(setLoadingFalse(false));
  console.log("Error creating account:", createError);

  if (createError.code === 'auth/weak-password') {
    Alert.alert('Error', 'Password should be at least 6 characters');
  } else if (createError.code === 'auth/email-already-in-use') {
    Alert.alert('Error', 'email-already-in-use');
  } else if (createError.code === 'auth/invalid-email') {
    Alert.alert('Error', 'invalid-email');
  } else if (createError.code === 'auth/missing-password') {
    Alert.alert('Error', 'missing-password');
  } else if (createError.code === 'auth/missing-email') {
    Alert.alert('Error', 'missing-email');
  } else {
    Alert.alert('Error', createError.message);
  }
}

  

export function fetchEmployeeData() {
    return async function fetchEmployeeDataThunk(dispatch) {
      try {
        
        const userEmail = getAuth().currentUser.email;
        const userDocRef = doc(collection(db, 'users'), userEmail);
        const employeesCollectionRef = collection(userDocRef, 'employees');
  
        // Fetch all documents from the "employees" collection
        const querySnapshot = await getDocs(employeesCollectionRef);
        
        
        // Extract data from the documents
        const employeeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        // Dispatch an action to update the state with the fetched data
        // You may want to create a specific action for this purpose
        // dispatch(updateEmployeeData(employeeData));
  
        // For now, you can log the data to the console
        
        dispatch(employeeUpdate({ prop: 'empList', value: employeeData }));
      } catch (error) {
        // Handle errors
        console.log('Error fetching employee data:', error);
        dispatch(setLoadingFalse(false));
        // You may want to dispatch an action to update the state with an error message
        // dispatch(updateErrorState(errorMessage));
      }
    };
  }

  // Action to update an employee record in Firestore
export function updateEmployeeRecord(auth, db, updatedEmployee) {
  return async function updateEmployeeRecordThunk(dispatch) {
    try {
      const userEmail = auth.currentUser.email;
      const userDocRef = doc(collection(db, 'users'), userEmail);
      const employeeDocRef = doc(collection(userDocRef, 'employees'), updatedEmployee.id);

      // Use updateDoc to update the existing document
      await updateDoc(employeeDocRef, {
        name: updatedEmployee.name,
        phone: updatedEmployee.phone,
        shift: updatedEmployee.shift,
      });

 Alert.alert('Employee record updated');
 dispatch(fetchEmployeeData(db));

      // You may want to dispatch an action to update the Redux store if needed
    } catch (error) {
      console.error('Error updating employee record:', error);
      // Handle errors if necessary
    }
  };
}

// Action to delete an employee record in Firestore
export function deleteEmployeeRecord(auth, db, employeeId) {
  return async function deleteEmployeeRecordThunk(dispatch) {
    try {
      const userEmail = auth.currentUser.email;
      const userDocRef = doc(collection(db, 'users'), userEmail);
      const employeeDocRef = doc(collection(userDocRef, 'employees'), employeeId);

      // Use deleteDoc to delete the document
      await deleteDoc(employeeDocRef);
      dispatch(fetchEmployeeData(db));

      Alert.alert('Employee record deleted from Firestore');
dispatch(employeeUpdate({ prop: 'name', value: '' }));
    dispatch(employeeUpdate({ prop: 'phone', value: '' }));
    dispatch(employeeUpdate({ prop: 'shift', value: 'Select Shift' }));
      // You may want to dispatch an action to update the Redux store if needed
    } catch (error) {
      console.error('Error deleting employee record:', error);
      // Handle errors if necessary
    }
  };
}
