/* eslint-disable */
import axios, {AxiosError} from "axios"
import {parseCookies, setCookie} from "nookies"
import {AuthTokenError} from "./errors/AuthTokenError"
import {useAuth} from "context/AuthContext"

export function getAPIClient(ctx?: any) {
  // let {"nextauth.token": token} = parseCookies(ctx)
  const {signOut} = useAuth()
  let cookies = parseCookies(ctx)

  let isRefreshing = false
  let failedRequestsQueue: any = []

  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies["nextauth.token"]}`,
    },
  })

  api.interceptors.request.use((config) => {
    console.log(config)

    return config
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === "token.expired") {
          cookies = parseCookies(ctx)

          const {"nextauth.refreshToken": refreshToken} = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post(
                "/refresh",
                {
                  refreshToken,
                },
              )
              .then((response) => {
                const {token} = response.data

                setCookie(ctx, "nextauth.token", token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/", // global
                })
                setCookie(ctx, "nextauth.refreshToken", response.data.refreshToken, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/", // global
                })
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`

                failedRequestsQueue.forEach((request: any) => request.onSuccess(token))
                failedRequestsQueue = []
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request: any) => request.onFailure(err))
                failedRequestsQueue = []

                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }
          //create a request queue
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          // logout the user
          if (process.browser) {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    }
  )

  // if (token) {
  //   api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  // }

  return api
}
