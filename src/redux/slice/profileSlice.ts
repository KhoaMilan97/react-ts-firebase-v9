import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { changeProfile } from 'redux/actions/profileAction';
import { getProfile } from './../actions/profileAction';

import { IAuth, IProfile } from './../../types/index';

export const profileUpdate = createAsyncThunk(
  'profile/update',
  async (params: { user: IAuth; data: IProfile }) => {
    const { user, data } = params;
    return await changeProfile(user, data);
  }
);

export const profileFetchData = createAsyncThunk('profile/fetch', async (uid: string) => {
  return await getProfile(uid);
});

export interface ProfileState {
  profile?: IProfile;
}

const initialState: ProfileState = {
  profile: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ({ type }) => type.startsWith('profile') && type.endsWith('fulfilled'),
      (state, action: PayloadAction<IProfile | undefined>) => {
        state.profile = action.payload;
      }
    );
  },
});

//export const { addUser } = profileSlice.actions;

export default profileSlice.reducer;
