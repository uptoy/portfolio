import {Address} from "@types"
import useSWR from "swr"
import fetcher from "services/fetcher"
import {api} from "services/apiClient"

export const AddressListUserGet = () => {
  return useSWR("/address", fetcher)
}

export const AddressUserGet = (id: string) => {
  return useSWR(`/address/${id}`, fetcher)
}

export const AddressUserCreate = (address: Address) => {
  return api.post("/address", address)
}

export const AddressUserUpdate = (id: string, address: Address) => {
  return api.put(`/address/${id}`, address)
}

export const AddressUserDelete = (id: string) => {
  return api.delete(`/address/${id}`)
}

