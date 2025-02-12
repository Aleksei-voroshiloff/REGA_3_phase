import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from '../types/types';
import { fetchUser, submitHandler, loginHandler, logoutHandler } from '../lib/userThunks';

const initialState: UserState = {
  status: 'loading',
  data: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'logged';
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.data = null;
        state.status = 'guest';
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(submitHandler.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'logged';
        state.error = null;
      })
      .addCase(submitHandler.rejected, (state, action) => {
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'logged';
        state.error = null;
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(logoutHandler.fulfilled, (state) => {
        state.data = null;
        state.status = 'guest';
        state.error = null;
      })
      .addCase(logoutHandler.rejected, (state, action) => {
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export default userSlice.reducer;
