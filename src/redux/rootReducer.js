import { combineReducers } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationSlice';
import mainReducer from './mainSlice';
import registrationReducer from './registrationSlice';
import persistedAuthenticationReducer from './persistedAuthenticationSlice';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  registration: registrationReducer,
  main: mainReducer,
  persistedAuthentication: persistedAuthenticationReducer,
});

export default rootReducer;
