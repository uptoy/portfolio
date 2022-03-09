import React, { useState, useContext } from "react"
import NextLink from "next/link"
import Image from "next/image"
import { Grid, Link, List, ListItem, Typography, Card, Button } from "@material-ui/core"
import Layout from "components/organisms/Layout"
import { useRouter } from "next/router"
import { products } from "utils/seed"
import Rating from "components/Rating"
import ProductReview from "components/ProductReview"
import theme from "theme"
import { makeStyles } from "@material-ui/styles"
import { Select, FormControl, MenuItem } from "@material-ui/core"
import Container from "@material-ui/core/Container"
// import { ErrorMessage } from "components/Message/ErrorMessage"
// import useStyles from "utils/styles"

const useStyles: any = makeStyles(() => ({
  typography: {
    padding: theme.spacing(2),
  },
  select: {
    border: "2px solid #14141545",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}))

const ProductDetail: React.ReactNode = () => {
  const product = products[0]
  const [qty, setQty] = useState(1)
  const router = useRouter()
  // const { state, dispatch } = useContext(StoreContext)
  const classes = useStyles()

  if (!product) {
    return <div>Product Not Found</div>
  }

  const addToCartHandler = async () => {
    // const existItem = state.cart.cartItems.find((x) => x._id === product._id)
    // const quantity = existItem ? existItem.quantity + 1 : 1
    // const { data } = await axios.get(`/api/products/${product._id}`)
    // if (data.countInStock < quantity) {
    //   window.alert('Sorry. Product is out of stock')
    //   return
    // }
    // dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    // router.push('/cart')
  }
  const productId = "1"
  const handleChange = (event: any) => {
    setQty(event.target.value)
  }
  return (
    <Layout>
      <Container maxWidth="xl" className={classes.container}>
        <div className={classes.section}>
          <NextLink href="/" passHref>
            <Link>
              <Typography>back to products</Typography>
            </Link>
          </NextLink>
        </div>
        <Grid container spacing={3}>
          <Grid item xs>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              layout="responsive"
            ></Image>
          </Grid>
          {/* Center */}
          <Grid item xs={4}>
            <List>
              <ListItem>
                <Typography component="h6" variant="h6">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Rating
                  value={product.rating}
                  text={`${product.reviews ? product.reviews.length : 0} reviews`}
                />
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand: {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography> Description: {product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          {/* Right */}
          <Grid item xs={3}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.countInStock > 0 ? "In stock" : "Unavailable"}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container style={{ alignItems: "center" }}>
                    <Grid item xs={6}>
                      <Typography>Quantity</Typography>
                    </Grid>
                    {product.countInStock > 0 && (
                      <Grid item xs={6}>
                        <FormControl>
                          <Select
                            value={qty}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em>Num</em>
                            </MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button fullWidth variant="contained" color="primary" onClick={addToCartHandler}>
                    Add to cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
        <ProductReview productId={productId} />
      </Container>
    </Layout>
  )
}

export default ProductDetail

// export const getServerSideProps = async (context: any) => {
//   const { params } = context
//   const { slug } = params
//   await db.connect()
//   const product = await Product.findOne({ slug }).lean()
//   await db.disconnect()
//   return {
//     props: {
//       product: db.convertDocToObj(product),
//     },
//   }
// }
