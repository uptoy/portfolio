import useSWR from "swr"
import fetcher from "lib/fetch"
import {apiClient} from "lib/api"
import {setCookie} from "nookies"
import api from "lib/api"
import nookies from 'nookies'


type SignInRequestData = {
  email: string
  password: string
}

// export const getCSRFCookie = () => {
//   return apiClient.get("/sanctum/csrf-cookie")
// }

export const signin = async (data: SignInRequestData) => {
  const res = await apiClient.post("/", data)
  const {token, user} = res.data
  setCookie(undefined, "token", token, {
    maxAge: 60 * 60 * 1,
  })
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  return user
}

export const logout = async () => {
  const cookies = nookies.get(ctx)

  for (const cookie of Object.keys(cookies)) {
    nookies.destroy(ctx, cookie)
  }

  return {
    server: true,
  }
}
  return await apiClient.post("/logout")
}

export const forgotPassword = async (email: string) => {
  return await apiClient.post("/forgot_password", {email})
}

export const resetPassword = async (fields: {
  email: string
  password: string
  password_confirmation: string
  token: string
}) => {
  return await apiClient.post("/reset_password", fields)
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
  const token = response.data.data.token
  setCookie(undefined, "token", token, {
    maxAge: 60 * 60 * 1,
  })
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const updateProfile = (fields: {name: string; email: string}) => {
  return apiClient.post("/me/update-profile", fields)
}

export const updateSettings = (fields: {language: string; currency: string; theme: string}) => {
  return apiClient.put("/me/settings", fields)
}
