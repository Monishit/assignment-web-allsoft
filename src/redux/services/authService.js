import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '../../utils/axios';

export const generateOtp = createAsyncThunk(
  'auth/generateOtpAsync',
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: '/generateOTP',
      method: 'post',
      data,
    })
);

export const validateOtp = createAsyncThunk(
  'auth/validateOtpAsync',
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: '/validateOTP',
      method: 'post',
      data,
    })
);
