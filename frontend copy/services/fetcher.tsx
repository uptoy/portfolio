import {api} from "services/apiClient"
export const fetcher = (url: string) => api.get(url).then((res) => res.data)

// export default async function fetcher(url: string) {
//   const res = await axios.get(url).then((res) => res.data)
//   return res.json()
// }
