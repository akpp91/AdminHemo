import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  name: '',
  phone: '',
  shift: '',
  empList:null
};

// Slice
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: 
  {
    employeeUpdate(state, action) 
    {
return{ ...state , [action.payload.prop]:action.payload.value }
    },
  },
  
});

// Selectors
export const userSelectors = {
  isLoggedIn: (state) => state.user.isLoggedIn,
  user: (state) => state.user.user,
};

// Actions
export const { employeeUpdate } = employeeSlice.actions;

// Reducer
export default employeeSlice.reducer;
