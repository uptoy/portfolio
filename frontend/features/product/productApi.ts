import apiClient from 'lib/apiClient'

export const getProducts = () => {
  return apiClient.get('/api/products')
}

export const getProductFindByID = (id: string) => {
  return apiClient.get(`/api/products/${id}`)
}

export const addProduct = (fields: { title: string }) => {
  return apiClient.post('/api/products', fields)
}

export const updateProduct = (id: string, fields: { title: string }) => {
  return apiClient.put(`/api/products/${id}`, fields)
}

export const deleteProduct = (id: string) => {
  return apiClient.delete(`/api/products/${id}`)
}
