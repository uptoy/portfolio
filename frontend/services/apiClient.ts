import axios from "axios"

const accessToken = localStorage.getItem("accessToken") || null

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:4000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

if (accessToken) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

export default apiClient
