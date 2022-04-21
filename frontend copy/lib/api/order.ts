import useSWR from "swr"
import fetcher from "lib/fetch"
import apiClient from "lib/apiClient"
import {Address} from "types"


export const useAddressListUserGet = () => {
  return useSWR("/address", fetcher)
}

export const useAddressUserGet = (id: string) => {
  return useSWR(`/address/${id}`, fetcher)
}

export const useAddressUserCreate = (address: Address) => {
  return apiClient.post("/address", address)
}

export const useAddressUserUpdate = (id: string, address: Address) => {
  return apiClient.put(`/address/${id}`, address)
}

export const useAddressUserDelete = (id: string) => {
  return apiClient.delete(`/address/${id}`)
}
