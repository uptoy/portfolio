import useSWR from "swr"
import fetcher from "services/fetcher"
import {api} from "services/apiClient"
import {Review} from "@types"

export const ReviewDetail = (productId: string, reviewId: string) => {
  return useSWR(`products/${productId}/reviews/${reviewId}`, fetcher)
}

export const ProductFindByName = (name: string) => {
  return useSWR(`/products/search/${name}`, fetcher)
}

export const ReviewCount = (id: string) => {
  return useSWR(`/${id}/reviews/count`, fetcher)
}

export const ReviewAdd = (id: string, review: Review) => {
  return api.post(`/products/${id}/reviews`, review)
}

export const ReviewUpdate = (productId: string, reviewId: string, review: Review) => {
  return api.put(`/products/${productId}/reviews/${reviewId}`, review)
}

export const ProductDelete = (productId: string, reviewId: string) => {
  return api.delete(`/products/${productId}/reviews/${reviewId}`)
}

// export const getCart = () => {
//   return apiClient.get("/api/cart")
// }

// export const getCartFindByID = (id: string) => {
//   return apiClient.get(`/api/cart/${id}`)
// }

// export const addCartItem = (fields: {title: string}) => {
//   return apiClient.post("/api/cart", fields)
// }

// export const updateCart = (id: string, fields: {title: string}) => {
//   return apiClient.put(`/api/cart/${id}`, fields)
// }

// export const deleteCartItem = (id: string) => {
//   return apiClient.delete(`/api/cart/${id}`)
// }
// import {getQuery} from "../utils/getQuery"

// const ProductAPI = {
//   all: () => axios.get("http://localhost:8080/api/products"),
// }

// export default ProductAPI

// // async function fetcher(url: any) {
// //   const res = await fetch(url)
// //   return res.json()
// // }

// // function useProjects() {
// //   return useSWR("http://localhost:8080/api/products", fetcher)
// // }
