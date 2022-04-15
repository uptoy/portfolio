import apiClient from "lib/apiClient"
import {Product} from "types"

export const getProducts = () => {
  return apiClient.get("/api/products")
}

export const getProductFindByID = (id: number) => {
  return apiClient.get(`/api/products/${id}`)
}

export const addProduct = (fields: Product) => {
  return apiClient.post("/api/products", fields)
}

export const updateProduct = (id: number, fields: Product) => {
  return apiClient.put(`/api/products/${id}`, fields)
}

export const deleteProduct = (id: number) => {
  return apiClient.delete(`/api/products/${id}`)
}

export const searchProduct = (name: string) => {
  return apiClient.delete(`/api/products/search/${name}`)
}
