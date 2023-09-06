import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['persistedAuthentication'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const customSerializableCheck = {
  ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: customSerializableCheck,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
