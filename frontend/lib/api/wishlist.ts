import useSWR from "swr"
import fetcher from "lib/fetch"
import apiClient from "lib/apiClient"
import {Product} from "types"
export const useWishlist = () => {
  return useSWR("/wishlist", fetcher)
}

export const useWishlistCreate = (product: Product) => {
  return apiClient.post("/wishlist", product)
}

export const useWishlistDelete = (id: string) => {
  return apiClient.delete(`/wishlist/${id}`)
}

export const useWishlistClear = () => {
  return apiClient.delete(`/wishlist/clear`)
}
