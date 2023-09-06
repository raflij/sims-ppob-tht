import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        profile: {},
        balance: 0,
        showBalance: false,
        services: [],
        banners: [],
        transactions: [],
        selectedService: {},
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setBalance: (state, action) => {
            state.balance = action.payload;
        },
        setServices: (state, action) => {
            state.services = action.payload;
        },
        setBanners: (state, action) => {
            state.banners = action.payload;
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        setSelectedService: (state, action) => {
            state.selectedService = action.payload;
        },
        setShowBalance: (state, action) => {
            state.showBalance = action.payload;
        }
    },
});

export const {
    setProfile,
    setBalance,
    setServices,
    setBanners,
    setTransactions,
    setSelectedService,
    setShowBalance
} = mainSlice.actions;

export default mainSlice.reducer;