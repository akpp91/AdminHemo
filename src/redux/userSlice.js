import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  isLoggedIn: false,
  user: null,
};

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action) {


      state.isLoggedIn = true;
      state.user =action.payload;
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Selectors
export const userSelectors = {
  isLoggedIn: (state) => state.user.isLoggedIn,
  user: (state) => state.user.user,
};

// Actions
export const { loginSuccess, logoutSuccess } = userSlice.actions;

// Reducer
export default userSlice.reducer;
