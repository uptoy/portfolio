import {Carousel} from "components"
import useSWR from "swr"
import React from "react"
import {Circular} from "./Circular"
const BaseURL = "http://localhost:8080/api"

const CarouselContainer = () => {
  const {data, isLoading} = useProducts()
  const products = data?.data
  if (isLoading) return <Circular />
  return (
    <div style={{marginTop: "3em"}}>
      <Carousel title="Ralated Product" products={products} />
      <Carousel title="New Arrival Products" products={products} />
    </div>
  )
}

export default CarouselContainer

const useProducts = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const {data, error} = useSWR(`${BaseURL}/products`, fetcher)
  return {data: data, isLoading: !error && !data}
}
