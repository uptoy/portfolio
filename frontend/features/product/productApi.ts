import apiClient from "lib/apiClient"

export const getProducts = () => {
  return apiClient.get("/api/products")
}

export const getProductFindByID = (id: number) => {
  return apiClient.get(`/api/products/${id}`)
}

export const addProduct = (fields: {title: string}) => {
  return apiClient.post("/api/products", fields)
}

export const updateProduct = (id: number, fields: {title: string}) => {
  return apiClient.put(`/api/products/${id}`, fields)
}

export const deleteProduct = (id: number) => {
  return apiClient.delete(`/api/products/${id}`)
}
