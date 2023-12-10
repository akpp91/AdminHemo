import { initializeApp } from "firebase/app";
import { getReactNativePersistence ,initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDQKehTsUytF_8yYeUXjKzgu2ghy3ItzOI",
    authDomain: "hemophilia-app-admin-side.firebaseapp.com",
    projectId: "hemophilia-app-admin-side",
    storageBucket: "hemophilia-app-admin-side.appspot.com",
    messagingSenderId: "548139513220",
    appId: "1:548139513220:web:152d79fa41f3f5fd5519d1",
    measurementId: "G-40QQ82XVVM"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });  