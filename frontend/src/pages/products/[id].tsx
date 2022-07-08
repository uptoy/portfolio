import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'
import React from 'react'
import { MenuItem, TextField, Grid, List, ListItem, Typography, Card, Button } from '@mui/material'
import { Rating, CarouselThumbs, CarouselContainer, ProductReview } from 'src/components'
import Layout from 'src/components/organisms/Layout'
import { useRouter } from 'next/router'
import theme from 'src/theme'
import { ICartItem, IProduct } from 'src/@types'
import { Average } from 'src/utils/average'
import { useAuth } from 'src/context/AuthContext'
import Link from 'next/link'
import { BaseURL } from '@/common'
import { useGetProductServer } from '@/hooks/fetcher'
type IProps = {
  data?: IProduct
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query
  const product = useGetProductServer(id as string)
  return { props: { product } }
}

const ProductDetail = (props: IProps) => {
  const router = useRouter()
  const { data } = props
  const fetchProduct = data
  const images = fetchProduct && fetchProduct.images && fetchProduct.images[0] ? fetchProduct?.images : []
  const reviews = fetchProduct && fetchProduct.reviews && fetchProduct.reviews[0] ? fetchProduct?.reviews : []
  const countInStock = fetchProduct ? fetchProduct.count_in_stock : ''
  const productName = fetchProduct ? fetchProduct.product_name : ''
  const categoryName = fetchProduct && fetchProduct.category ? fetchProduct.category.category_name : ''
  const brand = fetchProduct ? fetchProduct.brand : ''
  const description = fetchProduct ? fetchProduct.description : ''
  const price = fetchProduct ? fetchProduct.price : ''
  const { isAuthenticated } = useAuth()
  const averageNum = Average(reviews.map((review) => review.rating))
  const id = router.query.id as string
  const { handleSubmit, control } = useForm({
    defaultValues: {
      quantity: 1,
      product_id: Number(id)
    }
  })

  const onSubmit = async (formData: ICartItem) => {
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
  const cartAdd = async (formData: ICartItem) => {
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
      <Grid
        container
        mt={2}
        sx={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}
      >
        <Grid item sx={{ textAlign: 'center' }}>
          <CarouselThumbs images={images} />
        </Grid>
        <Grid item sx={{ textAlign: 'center' }}>
          <List>
            <ListItem>
              <Typography component="h6" variant="h6">
                {productName}
              </Typography>
            </ListItem>
            <ListItem>
              <Rating value={averageNum} text={`${reviews ? reviews.length : 0} reviews`} />
            </ListItem>
            <ListItem>
              <Typography>Category: {categoryName}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography> Description: {description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item sx={{ textAlign: 'center' }}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{price}</Typography>
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
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        display: 'block',
                        marginTop: theme.spacing(2)
                      }}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      type="button"
                      variant="contained"
                      color="primary"
                      sx={{
                        display: 'block',
                        marginTop: theme.spacing(2)
                      }}
                    >
                      <Link href="/auth/signin">Please Signin</Link>
                    </Button>
                  )}
                </ListItem>
              </form>
            </List>
          </Card>
        </Grid>
      </Grid>
      <ProductReview reviews={reviews} productId={id} />
      <CarouselContainer />
    </Layout>
  )
}

export default ProductDetail
