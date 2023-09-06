import { createSlice } from '@reduxjs/toolkit';

const persistedAuthenticationSlice = createSlice({
    name: 'persistedAuthentication',
    initialState: {
        user: null,
        isLoggedIn: false,
        token: null,
    },
    reducers: {
        setPersistedAuthentication: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const { setPersistedAuthentication, logout } = persistedAuthenticationSlice.actions;

export default persistedAuthenticationSlice.reducer;