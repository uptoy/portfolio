import useSWR from "swr"
import {fetcher} from "services/fetcher"
import {api} from "services/apiClient"
import {CartItem} from "@types"

export const CartGet = () => {
  return useSWR("/cart", fetcher)
}
export const CartAddItem = (cartItem: CartItem) => {
  return api.post("/cart/add", cartItem)
}
export const CartDeleteItem = (id: string) => {
  return api.delete(`/cart/${id}`)
}

export const CartIncrementItem = (id: string) => {
  return api.put("/cart/inc", id)
}

export const CartDecrementItem = (id: string) => {
  return api.put("/cart/dec", id)
}

