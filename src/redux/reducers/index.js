// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../userSlice';
import AuthReducer from '../AuthSlice';
import employeeReducer from '../employeeSlice'
const rootReducer = combineReducers({
  user: userReducer,
  Auth1: AuthReducer,
  employee:employeeReducer

  // other reducers go here
});

export default rootReducer;
