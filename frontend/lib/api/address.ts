import useSWR from "swr"
import fetcher from "lib/fetch"
import apiClient from "lib/apiClient"
import {Order} from "types"

export const useAddressListUserGet = () => {
  return useSWR("/orders", fetcher)
}

export const useOrderFindById = (id: string) => {
  return useSWR(`/orders/${id}`, fetcher)
}

export const useOrderDetail = (id: string) => {
  return useSWR(`/orders/${id}/detail`, fetcher)
}

export const useOrderCount = () => {
  return useSWR(`/orders/count`, fetcher)
}


export const useOrderCreate = (order: Order) => {
  return apiClient.post("/orders", order)
}
