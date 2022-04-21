import useSWR from "swr"
import fetcher from "lib/fetch"
import apiClient from "lib/apiClient"
import {Product} from "types"

export const useProductDetail = (id: string) => {
  return useSWR(`/products/${id}`, fetcher)
}

export const useProductFindByName = (name: string) => {
  return useSWR(`/products/search/${name}`, fetcher)
}

export const useProducts = () => {
  return useSWR(`/products`, fetcher)
}

export const useProductAdd = (product: Product) => {
  return apiClient.post("/products", product)
}

export const useProductUpdate = (id: string, product: Product) => {
  return apiClient.put(`/products/${id}`, product)
}

export const useProductDelete = (id: string) => {
  return apiClient.delete(`/products/${id}`)
}

