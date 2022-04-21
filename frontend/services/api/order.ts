import useSWR from "swr"
import fetcher from "services/fetcher"
import {api} from "services/apiClient"
import {Order} from "@types"

export const OrderListUserGet = () => {
  return useSWR("/orders", fetcher)
}

export const OrderFindById = (id: string) => {
  return useSWR(`/orders/${id}`, fetcher)
}

export const OrderDetail = (id: string) => {
  return useSWR(`/orders/${id}/detail`, fetcher)
}

export const OrderCount = () => {
  return useSWR(`/orders/count`, fetcher)
}

export const OrderCreate = (order: Order) => {
  return api.post("/orders", order)
}
