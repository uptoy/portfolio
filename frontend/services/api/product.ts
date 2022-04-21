import useSWR from "swr"
import {Product} from "@types"
import {fetcher} from "services/fetcher"
import {api} from "services/apiClient"

export const ProductFindById = (id: string) => {
  return useSWR(`/products/${id}`, fetcher)
}

export const ProductFindByNamie = (name: string) => {
  return useSWR(`/products/search/${name}`, fetcher)
}

export const Products = () => {
  return useSWR(`/products`, fetcher)
}


export const ProductAdd = (product: Product) => {
  return api.post("/products", product)
}

export const ProductUpdate = (id: string, product: Product) => {
  return api.put(`/products/${id}`, product)
}

export const ProductDelete = (id: string) => {
  return api.delete(`/products/${id}`)
}
