import apiClient from "lib/apiClient"

export const getReview = () => {
  return apiClient.get("/api/review")
}

export const getReviewFindByID = (id: number) => {
  return apiClient.get(`/api/review/${id}`)
}

export const addReview = (fields: {title: string}) => {
  return apiClient.post("/api/review", fields)
}

export const updateReview = (id: number, fields: {title: string}) => {
  return apiClient.put(`/api/review/${id}`, fields)
}

export const deleteReview = (id: number) => {
  return apiClient.delete(`/api/review/${id}`)
}
