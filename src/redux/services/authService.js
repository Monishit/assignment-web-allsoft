import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '@/utils/axios';

export const generateOtp = createAsyncThunk(
  'auth/generateOtpAsync',
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: 'documentManagement//generateOTP',
      method: 'post',
      data,
    })
);

export const validateOtp = createAsyncThunk(
  'auth/validateOtpAsync',
  async (data, toolkit) =>
    AxiosClient({
      toolkit,
      url: 'documentManagement//validateOTP',
      method: 'post',
      data,
    })
);
