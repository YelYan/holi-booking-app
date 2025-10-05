import { configureStore } from '@reduxjs/toolkit'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage/session';
import authReducer from './slices/authSlice'
import searchReducer from  "./slices/searchSlice"

const searchPersistConfig = {
  key: 'search',
  storage,
};

const persistedSearchReducer = persistReducer(searchPersistConfig, searchReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search : persistedSearchReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }),
})

export const persistor = persistStore(store);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;