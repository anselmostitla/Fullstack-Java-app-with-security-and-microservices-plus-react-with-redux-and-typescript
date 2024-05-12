import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {thunk} from "redux-thunk"
import TaskReducer from './task/TaskSlice'
import AuthReducer from './auth/AuthSlice'
import SubmissionReducer from './submission/submissionSlice'

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
   auth: AuthReducer,
   task: TaskReducer,
   submission: SubmissionReducer
})

const persistConfig = {  
   key: 'root',
   storage,
   version: 1,
 };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   // reducer: rootReducer,
   reducer: persistedReducer,
   // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
})

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export const authSelector = (state: RootState) => state.auth