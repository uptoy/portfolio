import useSWR from "swr"
import fetcher from "lib/fetch"
import {SERVER_BASE_URL} from "../utils/constant"
import apiClient from "lib/apiClient"
import {CartItem} from "types"
export const useCartGet = () => {
  return useSWR("/cart", fetcher)
}

export const useCartAddItem = (cartItem: CartItem) => {
  return apiClient.post("/cart/add", cartItem)
}

export const useCartIncrementItem = () => {
  return apiClient.put("/cart/inc")
}

export const useCartDecrementItem = () => {
  return apiClient.put("/cart/dec")
}

export const useCartDeleteItem = (id: string) => {
  return apiClient.delete(`/cart/${id}`)
}
