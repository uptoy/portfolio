// /* eslint-disable */
import axios, {AxiosError} from "axios"

export function getAPIClient(ctx?: any) {
  // let cookies = parseCookies(ctx)
  let isRefreshing = false
  let failedRequestsQueue: any = []
  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
      // 'X-Requested-With': 'XMLHttpRequest'
      // Authorization: `Bearer ${cookies["token"]}`,
    },

    withCredentials: true,
  })
  api.interceptors.request.use((config) => {
    return config
  })
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === "token.expired") {
          // cookies = parseCookies(ctx)
          // const {refreshToken: refreshToken} = cookies
          // console.log("read from local storage:::::::::::::::", refreshToken)
          const originalConfig = error.config
          if (!isRefreshing) {
            isRefreshing = true
            api
              .post("/tokens", {
                // refreshToken,
              })
              .then((response) => {
                const {token} = response.data
                // setCookie(ctx, "token", token, {
                //   maxAge: 60 * 60 * 24 * 30, // 30 days
                //   path: "/", // global
                // })
                // setCookie(ctx, "refreshToken", response.data.refreshToken, {
                //   maxAge: 60 * 60 * 24 * 30, // 30 days
                //   path: "/", // global
                // })
                // api.defaults.headers.common["Authorization"] = `Bearer ${token}`

                // failedRequestsQueue.forEach((request: any) => request.onSuccess(token))
                failedRequestsQueue.forEach((request: any) => request.onSuccess())
                failedRequestsQueue = []
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request: any) => request.onFailure(err))
                failedRequestsQueue = []
              })
              .finally(() => {
                isRefreshing = false
              })
          }
          //create a request queue
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: () => {
                // onSuccess: (token: string) => {
                // api.defaults.headers.common["Authorization"] = `Bearer ${token}`
                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          // logout the user
        }
      }

      return Promise.reject(error)
    }
  )
}
