import apiClient from "lib/apiClient"

export const getOrder = () => {
  return apiClient.get("/api/order")
}

export const getOrderFindByID = (id: number) => {
  return apiClient.get(`/api/order/${id}`)
}

export const addOrder = (fields: {title: string}) => {
  return apiClient.post("/api/order", fields)
}

export const updateOrder = (id: number, fields: {title: string}) => {
  return apiClient.put(`/api/order/${id}`, fields)
}

export const deleteOrder = (id: number) => {
  return apiClient.delete(`/api/order/${id}`)
}
