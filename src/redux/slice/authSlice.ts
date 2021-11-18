import { forgotPasswordApi } from './../actions/authActions';
import {
  registerApi,
  loginApi,
  googleApi,
  facebookApi,
} from 'redux/actions/authActions';
import { IRegister, ILogin } from './../../types/index';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface AuthState {
  currentUser?: any;
  loading: boolean;
}

const initialState: AuthState = {
  currentUser: '',
  loading: false,
};

export const authRegister = createAsyncThunk(
  'auth/register',
  async (user: IRegister) => {
    return await registerApi(user);
  }
);

export const authLogin = createAsyncThunk(
  'auth/login',
  async (user: ILogin) => {
    return await loginApi(user);
  }
);

export const googleLogin = createAsyncThunk('auth/google', async () => {
  return await googleApi();
});

export const facebookLogin = createAsyncThunk('auth/facebook', async () => {
  return await facebookApi();
});

export const authForgotPassword = createAsyncThunk(
  'auth/forgot_password',
  async (email: string) => {
    return await forgotPasswordApi(email);
  }
);

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<{}>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(authRegister.fulfilled, (state) => {
        state.loading = false;
      })
      // login
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(authLogin.fulfilled, (state) => {
        state.loading = false;
      })
      // google
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state) => {
        state.loading = false;
      })
      // facebook
      .addCase(facebookLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(facebookLogin.fulfilled, (state) => {
        state.loading = false;
      })
      // forgot passowrd
      .addCase(authForgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(authForgotPassword.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { addUser } = authSlice.actions;

export default authSlice.reducer;
