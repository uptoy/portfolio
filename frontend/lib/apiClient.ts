import axios from "axios"
import Cookies from "js-cookie"

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})
// const accessToken = Cookies.get("token")
const accessToken = Cookies.get("token")
if (accessToken) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

export default apiClient
