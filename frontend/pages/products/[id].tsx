import React, {useState} from "react"
import {CircularProgress, Grid, List, ListItem, Typography, Card, Button} from "@material-ui/core"
import {Link, Rating, CarouselThumbs, ProductReview, Carousel} from "components"
import Layout from "components/organisms/Layout"
import {useRouter} from "next/router"
import theme from "theme"
import {makeStyles} from "@material-ui/styles"
import {Select, FormControl, MenuItem} from "@material-ui/core"
import Container from "@material-ui/core/Container"
import {useProductDetail} from "lib/api/product"
import {useCartAddItem} from "lib/api/cart"
import axios from "axios"
import useSWR from "swr"
import apiClient from "lib/apiClient"
import fetcher from "lib/fetch"
import {CartItem} from "types"

const useStyles: any = makeStyles(() => ({
  gridContainer: {
    justifyContent: "space-around",
  },
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
  container: {
    marginTop: theme.spacing(3),
  },
  prgressColor: {
    color: "#fff",
  },
}))

const ProductDetail: React.ReactNode = () => {
  const [qty, setQty] = useState(1)
  const router = useRouter()
  // const { state, dispatch } = useContext(StoreContext)
  const classes = useStyles()
  const id = router.query.id as string
  const {data, error} = useProductDetail(id)
  if (error) return <div>failed to load</div>
  if (!data) return <CircularProgress color="secondary" />
  const product = data.data
  if (!product) {
    return <div>Product Not Found</div>
  }

  const images = data.data.images
  const reviews = data.data.reviews
  const countInStock = data.data.count_in_stock

  const addToCartHandler = async () => {
    console.log("qty", qty)
    const cartItem: CartItem = {
      product_id: Number(id),
      quantity: qty,
    }
    useCartAddItem(cartItem)
    if (countInStock < qty) {
      window.alert("Sorry. Product is out of stock")
      return
    }
    router.push("/cart")
    console.log("cartItem", cartItem)
  }

  const handleChange = (e: any) => {
    setQty(e.target.value)
  }
  const average = (arr: any) => arr.reduce((a: any, b: any) => a + b, 0) / arr.length
  const averageNum = average(product.reviews.map((review: any) => review.rating))

  return (
    <Layout>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container my={6} className={classes.gridContainer}>
          <Grid item xs>
            <CarouselThumbs images={images} />
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
                  value={averageNum}
                  text={`${product.reviews ? product.reviews.length : 0} reviews`}
                />
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category.category_name}</Typography>
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
                      <Typography>{product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{countInStock > 0 ? "In stock" : "Unavailable"}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container style={{alignItems: "center"}}>
                    <Grid item xs={6}>
                      <Typography>Quantity</Typography>
                    </Grid>
                    {countInStock > 0 && (
                      <Grid item xs={6}>
                        <FormControl>
                          <Select
                            value={qty}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{"aria-label": "Without label"}}
                          >
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
        <ProductReview reviews={reviews} />
        <Carousel title="Ralated Product" />
        <Carousel title="Popular products" />
      </Container>
    </Layout>
  )
}

export default ProductDetail
