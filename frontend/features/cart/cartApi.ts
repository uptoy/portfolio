import apiClient from "lib/apiClient"

export const getCart = () => {
  return apiClient.get("/api/cart")
}

export const getCartFindByID = (id: number) => {
  return apiClient.get(`/api/cart/${id}`)
}

export const addCart = (fields: {title: string}) => {
  return apiClient.post("/api/cart", fields)
}

export const updateCart = (id: number, fields: {title: string}) => {
  return apiClient.put(`/api/cart/${id}`, fields)
}

export const deleteCart = (id: number) => {
  return apiClient.delete(`/api/cart/${id}`)
}
