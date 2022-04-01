import apiClient from "lib/apiClient"

export const getCart = () => {
  return apiClient.get("/api/cart")
}

export const getCartFindByID = (id: string) => {
  return apiClient.get(`/api/cart/${id}`)
}

export const addCartItem = (fields: {title: string}) => {
  return apiClient.post("/api/cart", fields)
}

export const updateCart = (id: string, fields: {title: string}) => {
  return apiClient.put(`/api/cart/${id}`, fields)
}

export const deleteCartItem = (id: string) => {
  return apiClient.delete(`/api/cart/${id}`)
}
