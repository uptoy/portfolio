import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from 'features/counter/counterSlice'
import authReducer from 'features/auth/authSlice'
import blogReducer from 'features/blog/blogSlice'


export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      auth: authReducer,
      blog: blogReducer
    },
  })
}
const store = makeStore()

store.subscribe(() => {
  const { user } = store.getState().auth
  window.localStorage.setItem("currentUser", JSON.stringify(user))
})

export type RootState = ReturnType<typeof store.getState>
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store

