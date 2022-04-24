import useSWR from "swr"
import {fetcher} from "services/fetcher"
import {api} from "services/apiClient"
import {Product} from "@types"

export const WishlistGet = () => {
  return useSWR("/wishlist", fetcher)
}

export const WishlistCreate = (product: Product) => {
  return api.post("/wishlist", product)
}

export const WishlistDelete =  (id: string) => {
  return api.delete(`/wishlist/${id}`)
}
