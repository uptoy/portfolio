import apiClient from "lib/apiClient"
import {User} from "@types"

export const getUsers = () => {
  return apiClient.get("/api/user")
}

export const getUserFindByID = (uid: string) => {
  return apiClient.get(`/api/user/${uid}`)
}

export const getUserFindByEmail = (email: string) => {
  return apiClient.post(`/api/user`, email)
}

export const searchUser = (name: string) => {
  return apiClient.get(`/api/user/search/${name}`)
}

export const addUser = (fields: User) => {
  return apiClient.post("/api/user", fields)
}

export const updateUser = (uid: string, fields: User) => {
  return apiClient.put(`/api/user/${uid}`, fields)
}

export const deleteUser = (uid: string) => {
  return apiClient.delete(`/api/user/${uid}`)
}
