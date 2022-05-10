import {useForm, Controller} from "react-hook-form"
import toast from "react-hot-toast"
import {GetServerSidePropsContext, GetServerSideProps, NextPage} from "next"
import React from "react"
import {
  MenuItem,
  TextField,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  Container,
} from "@material-ui/core"
import {Rating, CarouselThumbs, ProductReview, Carousel} from "components"
import Layout from "components/organisms/Layout"
import {useRouter} from "next/router"
import theme from "theme"
import {makeStyles} from "@material-ui/styles"
import {CartItem, Review} from "@types"
import {Average} from "utils/average"
import {useAuth} from "context/AuthContext"
import {fetcher} from "pages/admin/product/add"
import useSWR from "swr"

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
  console.log("product", product)
  const router = useRouter()
  const classes = useStyles()
  const fetchProduct = product.data
  const images = fetchProduct.images
  const reviews = fetchProduct.reviews
  const countInStock = fetchProduct.count_in_stock
  const {isAuthenticated} = useAuth()
  console.log("isAuthenticated", isAuthenticated)
  const averageNum = Average(reviews.map((review: Review) => review.rating))
  const id = router.query.id as string
  const {handleSubmit, control} = useForm({
    defaultValues: {
      quantity: 1,
      product_id: Number(id),
    },
  })

  const onSubmit = async (formData: CartItem) => {
    try {
      if (isAuthenticated) {
        const res = await fetch(`${BaseURL}/cart`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          credentials: "include",
          body: JSON.stringify(formData),
        })
        router.push("/cart")
        console.log("res", res)
      } else {
        router.push("/auth/signin")
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
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
                <form onSubmit={() => handleSubmit(onSubmit)}>
                  <ListItem>
                    <Grid container style={{alignItems: "center"}}>
                      <Grid item xs={6}>
                        <Typography>Quantity</Typography>
                      </Grid>
                      {countInStock > 0 && (
                        <Grid item xs={6}>
                          <Controller
                            name="quantity"
                            control={control}
                            render={({field}) => (
                              <TextField {...field} select sx={{mt: 2}} required>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                              </TextField>
                            )}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </ListItem>
                  <ListItem style={{display: "block"}}>
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
        <CarouselContainer />
      </Container>
    </Layout>
  )
}

export default ProductDetail

const CarouselContainer = () => {
  const {data, error, mutate} = useSWR(`http://localhost:8080/api/products`, fetcher)
  console.log("data", data?.data)
  const products = data?.data
  return (
    <div>
      <Carousel title="Ralated Product" products={products} />
      <Carousel title="Popular products" products={products} />
    </div>
  )
}
