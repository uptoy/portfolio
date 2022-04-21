import {Category} from "@types"
import useSWR from "swr"
import fetcher from "services/fetcher"
import {api} from "services/apiClient"

export const CategoryList = () => {
  return useSWR(`/categories`, fetcher)
}

export const CategoryDetail = (id: string) => {
  return useSWR(`/categories/${id}`, fetcher)
}

export const CategoryFindByName = (name: string) => {
  return useSWR(`/category/search/${name}`, fetcher)
}

export const CategoryCreate = (category: Category) => {
  return api.post("/categories", category)
}

export const ProductUpdate = (id: string, category: Category) => {
  return api.put(`/categories/${id}`, category)
}

export const ProductDelete = (id: string) => {
  return api.delete(`/categories/${id}`)
}
