import axios from "axios"
import apiClient from "lib/apiClient"

const fetcher = (url: any) => apiClient.get(url).then((res) => res.data)

// import Cookies from "js-cookie"

// const apiClient = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
//   withCredentials: true,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// })
// // const accessToken = Cookies.get("token")
// const accessToken = Cookies.get("token")
// if (accessToken) {
//   apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
// }

// export default apiClient


// const updateOptions = () => {
//   if (typeof window === "undefined") return {}

//   if (!window.localStorage.user) return {}

//   if (Object.keys(window.localStorage.user).length === 0) return {}

//   const user = JSON.parse(window.localStorage.user)

//   if (!!user.token) {
//     return {
//       headers: {
//         Authorization: `Token ${user.token}`,
//       },
//     }
//   }
// }
// export default async function (url: any) {
//   const {data} = await apiClient.get(url, updateOptions())
//   return data
// }
