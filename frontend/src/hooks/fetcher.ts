import { BaseURL } from '@/common'
import useSWR from 'swr'
import {
  ICartItem,
  IGetCart,
  IGetProduct,
  IGetProducts,
  IGetCategories,
  IGetCategory,
  IGetWishlist,
  IWishlist,
  IProduct
} from 'src/@types'
import { CategoryType } from '@/yup/type'

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
  return await res.json()
}

//! product
export const useGetProduct = (id: string): IGetProduct => {
  const { data, error } = useSWR(`${BaseURL}/products/${id}`, fetcher)
  return { data: data, error, isLoading: !error && !data }
}

export const useGetProducts = (): IGetProducts => {
  const { data, error, mutate } = useSWR(`${BaseURL}/products`, fetcher)
  return { data: data, error, mutate, isLoading: !error && !data }
}

export const useGetProductServer = async (id: string) => {
  const res = await fetch(`${BaseURL}/products/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  return await res.json()
}

//! category
export const useGetCategories = (): IGetCategories => {
  const { data, error, mutate } = useSWR(`${BaseURL}/categories`, fetcher)
  return { data: data, error, mutate, isLoading: !error && !data }
}

export const useGetCategory = (categoryId: string): IGetCategory => {
  const { data, error } = useSWR(`${BaseURL}/categories/${categoryId}`, fetcher)
  return { data: data, error, isLoading: !error && !data }
}

export const useDeleteCategory = async (categoryId: number) => {
  await fetch(`${BaseURL}/categories/${String(categoryId)}`, {
    method: 'DELETE',
    credentials: 'include'
  })
}

export const useUpdateCategory = async (categoryId: string | undefined, formData: CategoryType) => {
  await fetch(`${BaseURL}/categories/${categoryId}`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(formData)
  })
}

type IProps = {
  data?: IWishlist
}

//! wishlist
export const useGetWishlist = (props: IProps): IGetWishlist => {
  const { data, error, mutate } = useSWR(`${BaseURL}/wishlist`, fetcher, {
    fallbackData: props.data,
    revalidateOnMount: true
  })
  return { data: data, error, mutate, isLoading: !error && !data }
}

export const useDeleteWishlist = async (product: IProduct) => {
  try {
    await fetch(`${BaseURL}/wishlist/${product.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
  } catch (err) {
    if (err instanceof Error) {
      console.log('Failed', err.message)
    } else {
      console.log('Unknown Failure', err)
    }
  }
}

export const useGetWishlistServer = async () => {
  const res = await fetch(`${BaseURL}/wishlist`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  return await res.json()
}
