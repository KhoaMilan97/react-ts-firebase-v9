import {
  registerApi,
  loginApi,
  googleApi,
  facebookApi,
  forgotPasswordApi,
  signOutApi,
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

export const authLogout = createAsyncThunk('auth/logout', async () => {
  return await signOutApi();
});

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ({ type }) => type.startsWith('auth') && type.endsWith('pending'),
        (state) => {
          state.loading = true;
        }
      )

      .addMatcher(
        ({ type }) => type.startsWith('auth') && type.endsWith('fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { addUser } = authSlice.actions;

export default authSlice.reducer;
