import { createSlice } from '@reduxjs/toolkit';
import { loginApi } from '../services/api';
import { setPersistedAuthentication } from './persistedAuthenticationSlice';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authenticationSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await loginApi(userData);
    if (response.status === 200) {
      const user = response.data;
      dispatch(loginSuccess(user));
      dispatch(
        setPersistedAuthentication({
          user: user,
          isLoggedIn: true,
          token: user.data.token
        })
      )
      return true;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      dispatch(loginFailure(errorMessage));
    } else {
      dispatch(loginFailure('Terjadi kesalahan ', error));
    }
  }
};

export default authenticationSlice.reducer;