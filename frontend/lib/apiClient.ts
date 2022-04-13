import axios from "axios"
import Cookies from "js-cookie"

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  // withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})
const accessToken = Cookies.get("token")
if (accessToken) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

export default apiClient
