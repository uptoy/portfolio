import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit"
import {createWrapper} from "next-redux-wrapper"
// import withRedux from "next-redux-wrapper";

import addressReducer from "features/address/addressSlice"
import authReducer from "features/auth/authSlice"
import categoryReducer from "features/category/categorySlice"
import todoSlide from "features/category/categorySlice"
import cartReducer from "features/cart/cartSlice"
import orderReducer from "features/order/orderSlice"
import productReducer from "features/product/productSlice"
import reviewReducer from "features/review/reviewSlice"
// import kanyeReducer from "features/kanyeSlice"
import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux"
import Cookies from "js-cookie"

export function makeStore() {
  return configureStore({
    reducer: {
      address: addressReducer,
      auth: authReducer,
      cart: cartReducer,
      category: categoryReducer,
      order: orderReducer,
      product: productReducer,
      review: reviewReducer,
      todo: todoSlide,
    },
  })
}

const store = makeStore()

store.subscribe(() => {
  const {user} = store.getState().auth
  Cookies.set("currentUser", JSON.stringify(user))
})
export default store
// export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootApp = ReturnType<typeof makeStore>
export const wrapper = createWrapper<RootApp>(makeStore)

export type RootState = ReturnType<typeof store.getState>
