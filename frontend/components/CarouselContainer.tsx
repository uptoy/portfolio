import {Carousel} from "components"
import useSWR from "swr"
import theme from "theme"
import React from "react"
import {makeStyles} from "@material-ui/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
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

const useStyles: any = makeStyles(() => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}))

function Circular() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  )
}
