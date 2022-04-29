import useSWR from "swr"
import {useReducer} from "react"
import {useForm, Controller} from "react-hook-form"
import toast from "react-hot-toast"
import {GetServerSidePropsContext, GetServerSideProps, NextPage} from "next"
import React, {ReactEventHandler, useState} from "react"
import {TextField, Grid, List, ListItem, Typography, Card, Button} from "@material-ui/core"
import {Rating, CarouselThumbs, ProductReview, Carousel} from "components"
import Layout from "components/organisms/Layout"
import {useRouter} from "next/router"
import theme from "theme"
import {makeStyles} from "@material-ui/styles"
import {Select, FormControl, MenuItem} from "@material-ui/core"
import Container from "@material-ui/core/Container"
// import {Circular} from "components/common/Circular"
import {CartAddItem} from "services/api/cart"
import {CartItem, Review} from "@types"
import {Average} from "utils/average"
import {Product} from "@types"

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
const BaseURL = "http://localhost:8080/api"

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const {id} = ctx.query
  const res = await fetch(`${BaseURL}/products/${id}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  })
  const product = await res.json()
  return {props: {product}}
}

const ProductDetail: NextPage = ({product}: any) => {
  const router = useRouter()
  const classes = useStyles()
  const id = router.query.id as string
  const fetchProduct = product.data
  const images = fetchProduct.images
  const reviews = fetchProduct.reviews
  const countInStock = fetchProduct.count_in_stock
  const [qty, setQty] = useState(1)
  const handleChange = (e: any) => {
    setQty(e.target.value)
  }

  const averageNum = Average(reviews.map((review: Review) => review.rating))

  const handleSubmit = async (id: string) => {
    const cartItem: CartItem = {
      product_id: Number(id),
      quantity: qty,
    }
    try {
      await fetch(`${BaseURL}/cart`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(cartItem),
      })
      router.push("/cart")
    } catch (err) {
      toast.error(err.response?.data.message)
      throw err
    }
  }

  return (
    <Layout>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container my={6} className={classes.gridContainer}>
          <Grid item xs>
            <CarouselThumbs images={images} />
          </Grid>
          <Grid item xs={4}>
            <List>
              <ListItem>
                <Typography component="h6" variant="h6">
                  {fetchProduct.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Rating value={averageNum} text={`${reviews ? reviews.length : 0} reviews`} />
              </ListItem>
              <ListItem>
                <Typography>Category: {fetchProduct.category.category_name}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand: {fetchProduct.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography> Description: {fetchProduct.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{fetchProduct.price}</Typography>
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
                <form onSubmit={() => handleSubmit(id)}>
                  <ListItem>
                    <Grid container style={{alignItems: "center"}}>
                      <Grid item xs={6}>
                        <Typography>Quantity</Typography>
                      </Grid>
                      {countInStock > 0 && (
                        <Grid item xs={6}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={qty}
                            onChange={handleChange}
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                          </Select>
                        </Grid>
                      )}
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Add to Cart
                    </Button>
                  </ListItem>
                </form>
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

{
  /* <ListItem>
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
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </ListItem> */
}
