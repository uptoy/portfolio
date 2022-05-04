import apiClient from "lib/apiClient"

export const getAddress = () => {
  return apiClient.get("/api/address")
}

export const getAddressFindByID = (id: number) => {
  return apiClient.get(`/api/address/${id}`)
}

export const addAddress = (fields: {title: string}) => {
  return apiClient.post("/api/address", fields)
}

export const updateAddress = (id: number, fields: {title: string}) => {
  return apiClient.put(`/api/address/${id}`, fields)
}

export const deleteAddress = (id: number) => {
  return apiClient.delete(`/api/address/${id}`)
}
