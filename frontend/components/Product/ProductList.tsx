import {CircularProgress} from "@material-ui/core"
import React, {useEffect} from "react"
import {createStyles} from "@material-ui/core/styles"
import {makeStyles} from "@material-ui/styles"
import ProductItem from "./ProductItem"
import {useAppDispatch, useAppSelector} from "app/hooks"
import {fetchProducts} from "features/product/productSlice"
import theme from "theme"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"

const useStyles: any = makeStyles(() =>
  createStyles({
    container: {
      height: "83%",
    },
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
  console.log(products[0])
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
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell >Brand</TableCell>
                <TableCell align="center">Stock </TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && <p>Oops, something went wrong</p>}
    </>
  )
}
export default ProductList
