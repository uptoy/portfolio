import {Category} from "@types"
import useSWR from "swr"
import {fetcher} from "services/fetcher"
import {api} from "services/apiClient"

export const CategoryList = () => {
  return useSWR(`/category`, fetcher)
}

export const CategoryDetail = (id: string) => {
  return useSWR(`/category/${id}`, fetcher)
}

export const CategoryFindByName = (name: string) => {
  return useSWR(`/category/search/${name}`, fetcher)
}

export const CategoryCreate = (category: Category) => {
  return api.post("/category", category)
}

export const ProductUpdate = (id: string, category: Category) => {
  return api.put(`/category/${id}`, category)
}

export const ProductDelete = (id: string) => {
  return api.delete(`/category/${id}`)
}
