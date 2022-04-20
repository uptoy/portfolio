import useSWR from "swr"
import fetcher from "lib/fetch"
import {SERVER_BASE_URL} from "../utils/constant"
import apiClient from "lib/apiClient"
import {Category} from "types"
import axios from "axios"

export const useCategoryList = () => {
  return useSWR(`/categories`, fetcher)
}

export const useCategoryDetail = (id: string) => {
  return useSWR(`/categories/${id}`, fetcher)
}

export const useCategoryFindByName = (name: string) => {
  return useSWR(`/category/search/${name}`, fetcher)
}

export const useCategoryCreate = (category: Category) => {
  return apiClient.post("/categories", category)
}

export const useProductUpdate = (id: string, category: Category) => {
  return apiClient.put(`/categories/${id}`, category)
}

export const useProductDelete = (id: string) => {
  return apiClient.delete(`/categories/${id}`)
}
