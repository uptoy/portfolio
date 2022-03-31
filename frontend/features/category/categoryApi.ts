import apiClient from "lib/apiClient"

export const getCategories = () => {
  return apiClient.get("/api/categories")
}

export const getCategoryFindByID = (id: string) => {
  return apiClient.get(`/api/categories/${id}`)
}

export const addCategory = (fields: {title: string}) => {
  return apiClient.post("/api/categories", fields)
}

export const updateCategory = (id: string, fields: {title: string}) => {
  return apiClient.put(`/api/categories/${id}`, fields)
}

export const deleteCategory = (id: string) => {
  return apiClient.delete(`/api/categories/${id}`)
}
