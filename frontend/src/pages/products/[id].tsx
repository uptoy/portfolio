import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { GetServerSidePropsContext, GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { MenuItem, TextField, Grid, List, ListItem, Typography, Card, Button } from '@material-ui/core'
import { Rating, CarouselThumbs, ProductReview, CarouselContainer } from 'src/components'
import Layout from 'src/components/organisms/Layout'
import { useRouter } from 'next/router'
import theme from 'theme'
import { makeStyles } from '@material-ui/styles'
import { CartItem, Product, Review } from 'src/@types'
import { Average } from 'src/utils/average'
import { useAuth } from 'src/context/AuthContext'
import Link from 'next/link'

const useStyles: any = makeStyles(() => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  grid: {
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
  },
  item: {
    textAlign: 'center'
  }
}))

const BaseURL = 'http://localhost:8080/api'
export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query
  const res = await fetch(`${BaseURL}/products/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  const product: Product = await res.json()
  return { props: { product } }
}

const ProductDetail: NextPage = ({ product }: any) => {
  const router = useRouter()
  const classes = useStyles()
  const fetchProduct = product.data
  const images = fetchProduct.images
  const reviews = fetchProduct.reviews
  const countInStock = fetchProduct.count_in_stock
  const { isAuthenticated } = useAuth()
  const averageNum = Average(reviews.map((review: Review) => review.rating))
  const id = router.query.id as string
  const { handleSubmit, control } = useForm({
    defaultValues: {
      quantity: 1,
      product_id: Number(id)
    }
  })

  const onSubmit = async (formData: CartItem) => {
    try {
      await cartAdd(formData)
      router.push('/cart')
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log('Failed', err.message)
      } else {
        console.log('Unknown Failure', err)
      }
    }
  }
  const cartAdd = async (formData: CartItem) => {
    await fetch(`${BaseURL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
  }
  console.log(images)

  return (
    <Layout>
      <Grid container mt={2} className={classes.grid}>
        <Grid item className={classes.item}>
          <CarouselThumbs images={images} />
        </Grid>
        <Grid item className={classes.item}>
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
        <Grid item className={classes.item}>
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
                    <Typography>{countInStock > 0 ? 'In stock' : 'Unavailable'}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ListItem>
                  <Grid container style={{ alignItems: 'center' }}>
                    <Grid item xs={6}>
                      <Typography>Quantity</Typography>
                    </Grid>
                    {countInStock > 0 && (
                      <Grid item xs={6}>
                        <Controller
                          name="quantity"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} select sx={{ mt: 2 }} required>
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
                <ListItem style={{ display: 'block' }}>
                  {isAuthenticated ? (
                    <Button fullWidth type="submit" variant="contained" color="primary" className={classes.button}>
                      Add to Cart
                    </Button>
                  ) : (
                    <Button fullWidth type="button" variant="contained" color="primary" className={classes.button}>
                      <Link href="/auth/signin">Please Signin</Link>
                    </Button>
                  )}
                </ListItem>
              </form>
            </List>
          </Card>
        </Grid>
      </Grid>
      {/* <ProductReview reviews={reviews} productId={id} /> */}
      <CarouselContainer />
    </Layout>
  )
}

export default ProductDetail
