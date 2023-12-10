import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  email:'',
  password:'',
  mobileNumber: '',
  hemophiliaOrThalassemia: 'Hospital A', // Default value for the Picker
  hospitalName: '',
  state: '',
  district: '',
  taluka: '',
  isConditionModalVisible: false,
  selectedConditions: [],

  isLoggedIn: false,
  user: null,
  loading: false,
  auth:null   ,
  

};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState  ,
  reducers: 
  {
    AuthUpdate(state, action) 
    {
    return{ ...state , [action.payload.prop]:action.payload.value }
    },

    selectedConditionsUpdate(state,action){
        state.selectedConditions.push(action.payload)
    }
    ,
    selectedConditionsSlice(state,action){
      state.selectedConditions.splice(action.payload, 1);
  }
    ,
    
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.loading=false;      

    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.email='',
      state.password=''
    },
    setLoading(state , action)
    {
        return {...state, loading:action.payload };
    },

    setLoadingFalse(state, action)
    {
      return {...state, loading:action.payload };
    },

    setAuth(state, action)
    {
      return {...state, auth:action.payload };
    }
  },
});

export const { selectedConditionsSlice,selectedConditionsUpdate,AuthUpdate,setAuth, setLoadingFalse, setLoading,loginSuccess ,logoutSuccess, loginUser,emailChange, passwordChange } = AuthSlice.actions;
// This line is exporting the action creator function setMessage that was automatically generated 
// by createSlice. You can use this function in your React components to dispatch actions 
// that the messageSlice reducer can respond to.

// Selectors
export const userSelectors = {
  isLoggedIn: (state) => state.user.isLoggedIn,
  user: (state) => state.user.user,
  loading:(state) => state.user.loading,
};

export default AuthSlice.reducer;
