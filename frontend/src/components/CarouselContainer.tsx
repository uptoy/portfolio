import { Carousel } from 'src/components'
import useSWR from 'swr'
import React from 'react'
import { Circular } from './Circular'
import { BaseURL } from '@/common'
import { Box } from '@mui/material'

const CarouselContainer = () => {
  const { data, isLoading } = useProducts()
  const products = data?.data
  if (isLoading) return <Circular />
  return (
    <Box component="div" sx={{ marginTop: '3em' }}>
      <Carousel title="Ralated Product" products={products} />
      <Carousel title="New Arrival Products" products={products} />
    </Box>
  )
}

export default CarouselContainer

const useProducts = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR(`${BaseURL}/products`, fetcher)
  return { data: data, isLoading: !error && !data }
}
