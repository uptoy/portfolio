import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit"
import {createWrapper} from "next-redux-wrapper"
import counterReducer from "features/counter/counterSlice"
import authReducer from "features/auth/authSlice"
import categoryReducer from "features/category/categorySlice"
import productReducer from "features/product/productSlice"
import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux"
import Cookies from "js-cookie"

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      auth: authReducer,
      category: categoryReducer,
      product: productReducer,
    },
  })
}

const store = makeStore()

store.subscribe(() => {
  const {user} = store.getState().auth
  Cookies.set("currentUser", JSON.stringify(user))
})
export default store
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export type RootApp = ReturnType<typeof makeStore>
export const wrapper = createWrapper<RootApp>(makeStore)
