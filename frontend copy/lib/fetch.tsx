import axios from "axios"
// import {apiClient} from "lib/apiClient"
import {apiClient} from "lib/api"
const fetcher = (url: string) => apiClient.get(url).then((res) => res.data)

export default fetcher

// export default async function fetcher(url: string) {
//   const res = await axios.get(url).then((res) => res.data)
//   return res.json()
// }
