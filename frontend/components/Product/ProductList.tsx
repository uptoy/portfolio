import {List, Divider, CardContent, Card, CircularProgress} from "@material-ui/core"
import React, {useEffect} from "react"
import {createStyles} from "@material-ui/core/styles"
import {makeStyles} from "@material-ui/styles"
import ProductItem from "./ProductItem"
import {useAppDispatch, useAppSelector} from "app/hooks"
import {fetchProducts} from "features/product/productSlice"
import theme from "theme"

const useStyles: any = makeStyles(() =>
  createStyles({
    list: {
      width: "100%",
      margin: 0,
      padding: 0,
      backgroundColor: theme.palette.background.paper,
    },
    loadingContainer: {
      textAlign: "center",
      margin: "100px 0",
    },
  })
)
const ProductList = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const {products, status, error} = useAppSelector((state) => state.product)
  console.log("products", products)
  if (status === "loading") {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    )
  }
  return (
    <>
      {products && (
        <Card>
          <CardContent>
            <List dense className={classes.list}>
              {products.map((product) => (
                <>
                  <div key={product?.id}>
                    <ProductItem product={product} />
                    <Divider component="li" />
                  </div>
                </>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
      {error && <p>Oops, something went wrong</p>}
    </>
  )
}
export default ProductList
