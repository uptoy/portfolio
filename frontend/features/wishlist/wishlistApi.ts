import apiClient from "lib/apiClient"

export const getWishlist = () => {
  return apiClient.get("/api/wishlist")
}

export const getWishlistFindByID = (id: number) => {
  return apiClient.get(`/api/wishlist/${id}`)
}

export const addWishlist = (fields: {title: string}) => {
  return apiClient.post("/api/wishlist", fields)
}

export const updateWishlist = (id: number, fields: {title: string}) => {
  return apiClient.put(`/api/wishlist/${id}`, fields)
}

export const deleteWishlist = (id: number) => {
  return apiClient.delete(`/api/wishlist/${id}`)
}
