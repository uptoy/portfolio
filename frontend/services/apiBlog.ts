import apiClient from "./apiClient"
import ParsedUrlQuery from "next/router"
import { IUser, IUserSignIn, IUserSignUp } from "types"
import { IBlog } from "features/blog/blogSlice"

export const getBlogDetail = (_id: string) => {
  return apiClient.get(`/api/blogs/${_id}`)
}
export const getBlogs = () => {
  return apiClient.get("/api/blogs")
}

export const createBlog = (blog: IBlog) => {
  return apiClient.post("/api/blogs/create", blog)
}

export const updateBlog = (_id: string, blog: IBlog) => {
  return apiClient.patch(`/api/blogs/update/${_id}`, blog)
}

export const deleteBlog = (_id: string) => {
  return apiClient.post(`/api/blogs/delete/${_id}`)
}
