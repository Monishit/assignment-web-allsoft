import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { generateOtp, validateOtp } from '../services/authService';

const initialState = {
  isLoading: false,
  token: '',
  userData: {},
  otp: 0,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GENERATE OTP API SLICE
    builder.addMatcher(isAnyOf(generateOtp.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(generateOtp.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.otp = payload.otp;
    });
    builder.addMatcher(isAnyOf(generateOtp.rejected), (state) => {
      state.isLoading = false;
    });
     // VALIDATE OTP API SLICE
    builder.addMatcher(isAnyOf(validateOtp.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(validateOtp.fulfilled), (state, { payload }) => {
      state.isLoading = false;
      state.token = payload.authToken;
      state.userData = payload.data;
    });
    builder.addMatcher(isAnyOf(validateOtp.rejected), (state) => {
      state.isLoading = false;
    });
  },
});

export default AuthSlice.reducer;
