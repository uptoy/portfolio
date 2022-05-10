import {Carousel} from "components"
import useSWR from "swr"
const BaseURL = "http://localhost:8080/api"

const CarouselContainer = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const {data, error, mutate} = useSWR(`${BaseURL}/products`, fetcher)
  console.log("data", data?.data)
  const products = data?.data
  return (
    <div>
      <Carousel title="Ralated Product" products={products} />
      <Carousel title="Popular products" products={products} />
    </div>
  )
}

export default CarouselContainer
