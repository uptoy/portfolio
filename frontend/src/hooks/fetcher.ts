import { BaseURL } from '@/common'
import useSWR, { KeyedMutator } from 'swr'
import { ICartItem, IGetCart } from 'src/@types'

export const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }).then((r) => r.json())

//! cart
export const useDeleteCartItem = async (productId: number) => {
  await fetch(`${BaseURL}/cart/${productId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
}

export const useIncCartItem = async (productId: number) => {
  await fetch(`${BaseURL}/cart/inc/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
}

export const useDecCartItem = async (productId: number) => {
  await fetch(`${BaseURL}/cart/dec/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
}

export const useGetCart = (cart: ICartItem[]): IGetCart => {
  const { data, error, mutate } = useSWR(`${BaseURL}/cart`, fetcher, {
    fallbackData: cart,
    revalidateOnMount: true
  })
  return { data: data, error, mutate, isLoading: !error && !data }
}
// const useCarts = (cart: ICartItem) => {
//   const { data, error } = useSWR(`${BaseURL}/cart`, fetcher, {
//     fallbackData: cart,
//     revalidateOnMount: true
//   })
//   return { data: data, isLoading: !error && !data }
// }

export const useGetCartServer = async () => {
  const res = await fetch(`${BaseURL}/cart`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  const cart = await res.json()
  return cart
}
