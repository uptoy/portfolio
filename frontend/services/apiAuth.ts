import apiClient from "./apiClient"
import ParsedUrlQuery from "next/router"
import { IUser, IUserSignIn, IUserSignUp } from "types"

export const getCSRFCookie = () => {
  return apiClient.get("/sanctum/csrf-cookie")
}

export const signin = (userSignIn: IUserSignIn) => {
  return apiClient.post("/api/signin", userSignIn)
}

export const forgotPassword = (email: string) => {
  return apiClient.post("/api/forgot-password", { email })
}

export const resetPassword = (fields: {
  password: string
  password_confirm: string
  token: typeof ParsedUrlQuery
}) => {
  return apiClient.post("/api/reset-password", fields)
}

export const resendVerifyEmail = () => {
  return apiClient.post("/api/email/verification-notification")
}

export const signinWithGoogle = (accessToken: string) => {
  return apiClient.post("/api/signin/google", { accessToken })
}

export const signup = (userSignUp: IUserSignUp) => {
  return apiClient.post("/api/signup", userSignUp)
}

export const getCurrentUser = () => {
  return apiClient.get("/api/account/me")
}

export const changePassword = async (fields: {
  current_password: string
  new_password: string
  new_password_confirmation: string
}) => {
  const response = await apiClient.post("/api/account/change-password", fields)
  const accessToken = response.data.data.token
  window.localStorage.setItem("accessToken", accessToken)
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

export const updateProfile = (fields: { name: string; email: string }) => {
  return apiClient.post("/api/account/update-profile", fields)
}

export const updateSettings = (fields: { language: string; currency: string; theme: string }) => {
  return apiClient.put("/api/settings", fields)
}
