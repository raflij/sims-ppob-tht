// registrationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { registerApi } from '../services/api';

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        registrationRequest: (state) => {
            state.loading = true;
            state.successMessage = null;
            state.error = null;
        },
        registrationSuccess: (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
        },
        registrationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { registrationRequest, registrationSuccess, registrationFailure } = registrationSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(registrationRequest());
        const response = await registerApi(userData);
        if (response.status === 200) {
            const user = response.data;
            dispatch(registrationSuccess(user));
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data.message;
            dispatch(registrationFailure(errorMessage));
        } else {
            dispatch(registrationFailure('Terjadi kesalahan ', error));
        }
    }
};

export default registrationSlice.reducer;