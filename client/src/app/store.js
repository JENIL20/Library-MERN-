import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userslice, { userSlice } from '../features/userslice.js'
import { persistReducer, persistStore } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { bookSlice } from '../features/bookslice.js'
import { loadingSlice } from '../features/loadingslice.js'

const persistConfig = {
  key: "persist-store",
  storage
}
const rootreducer = combineReducers({
  user: userSlice.reducer,
  book: bookSlice.reducer,
  loading: loadingSlice.reducer

})
const persistedReducer = persistReducer(persistConfig, rootreducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})
// const persistedStore = persistStore(store)
export const persistor = persistStore(store);