import apiClient from "lib/apiClient"
import Cookies from "js-cookie"
import useSWR from "swr"
import fetcher from "lib/fetch"

const accessToken = Cookies.get("token")
if (accessToken) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

// export const getCSRFCookie = () => {
//   return apiClient.get("/sanctum/csrf-cookie")
// }

export const signin = (email: string, password: string) => {
  return apiClient.post("/signin", {email, password})
}

export const forgotPassword = (email: string) => {
  return apiClient.post("/forgot_password", {email})
}

export const resetPassword = (fields: {
  email: string
  password: string
  password_confirmation: string
  token: string
}) => {
  return apiClient.post("/reset_password", fields)
}

export const resendVerifyEmail = () => {
  return apiClient.post("/email/verification-notification")
}

export const signinWithGoogle = (accessToken: string) => {
  return apiClient.post("/login/google", {accessToken})
}

export const signup = (fields: {
  name: string
  email: string
  password: string
  password_confirmation: string
}) => {
  return apiClient.post("/signup", fields)
}

export const getCurrentUser = () => {
  return useSWR(`/me`, fetcher)
}

export const changePassword = async (fields: {
  current_password: string
  new_password: string
  new_password_confirmation: string
}) => {
  const response = await apiClient.post("/me/change-password", fields)
  const accessToken = response.data.data.token
  Cookies.set("accessToken", accessToken)
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

export const updateProfile = (fields: {name: string; email: string}) => {
  return apiClient.post("/me/update-profile", fields)
}

export const updateSettings = (fields: {language: string; currency: string; theme: string}) => {
  return apiClient.put("/me/settings", fields)
}
