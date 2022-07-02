import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import theme from 'src/theme'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'
import toast from 'react-hot-toast'
import { Box, Grid, Button, List, ListItem, Paper, Typography } from '@mui/material'
import { Layout } from 'src/components/organisms'
import { CartItem } from 'src/@types'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Link } from 'src/components'
import { Icon } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAuth } from 'src/context/AuthContext'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { CarouselContainer } from 'src/components'
import { BaseURL } from '@/common'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { req } = ctx
  if (req.headers.cookie === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signup'
      }
    }
  }
  const res = await fetch(`${BaseURL}/cart`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  const cart = await res.json()
  return { props: { cart } }
}

export const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }).then((r) => r.json())

const Cart: NextPage = ({ cart }: any) => {
  const { data, mutate } = useSWR(`${BaseURL}/cart`, fetcher, {
    fallbackData: cart,
    revalidateOnMount: true
  })
  const { data: data1 } = useSWR(`${BaseURL}/products`, fetcher)
  console.log('data1', data1?.data[0].product_name)
  console.log('data1', data1?.data[1].product_name)
  const router = useRouter()
  // const classes = useStyles()
  const fetchCartItems = data.data
  const handleDecrement = async (cartItem: CartItem) => {
    const quantity = cartItem.quantity
    const productId = cartItem.product_id
    try {
      if (quantity == 1) {
        await fetch(`${BaseURL}/cart/${productId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        await mutate({ ...data, cartItem })
      } else {
        await fetch(`${BaseURL}/cart/dec/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        await mutate({ ...data, cartItem })
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log('Failed', err.message)
      } else {
        console.log('Unknown Failure', err)
      }
    }
  }
  const handleIncrement = async (cartItem: CartItem) => {
    try {
      const productId = cartItem.product_id
      await fetch(`${BaseURL}/cart/inc/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      await mutate({ ...data, cartItem })
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log('Failed', err.message)
      } else {
        console.log('Unknown Failure', err)
      }
    }
  }
  const handleDelete = async (cartItem: CartItem) => {
    const productId = cartItem.product_id
    try {
      await fetch(`${BaseURL}/cart/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      await mutate({ ...data, cartItem })
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log('Failed', err.message)
      } else {
        console.log('Unknown Failure', err)
      }
    }
  }
  const handleCheckOut = async () => {
    router.push('/checkout')
  }
  const totalNum: number = fetchCartItems?.reduce((total: number, cartItem: CartItem): number => {
    return total + cartItem.quantity
  }, 0)
  const totalPrice: number = fetchCartItems?.reduce((total: number, cartItem: any): number => {
    return total + cartItem.quantity * cartItem.product.price
  }, 0)

  return (
    <Layout>
      <Box component="div" sx={{ marginTop: '2em', marginBottom: '2em' }}>
        {fetchCartItems?.length === 0 ? (
          <Paper sx={{ padding: theme.spacing(5), color: theme.palette.text.secondary }}>
            <p>Cart is empty.</p>
            <Link href="/">Go shopping</Link>
          </Paper>
        ) : (
          <Box
            component="div"
            sx={{
              flexGrow: 1
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={9}>
                {fetchCartItems?.map((cartItem: CartItem, index: number) => (
                  <Paper
                    sx={{ padding: theme.spacing(2), color: theme.palette.text.secondary, marginBottom: '1em' }}
                    key={index}
                  >
                    <Box component="div" sx={{ display: 'flex' }}>
                      <Box
                        component="div"
                        sx={{
                          position: 'relative',
                          width: '30vw',
                          height: '100%',
                          minHeight: '8em',
                          minWidth: '8em',
                          maxHeight: '13em',
                          maxWidth: '13em'
                        }}
                      >
                        <Image
                          alt={cartItem.product?.product_name}
                          src={cartItem.product?.images[0].url as string}
                          width={'100%'}
                          height={'100%'}
                          layout="responsive"
                        />
                      </Box>
                      <Box component="div" sx={{ paddingTop: 10, paddingLeft: 20 }}>
                        <Link href={`/products/${cartItem.product_id}`}>
                          <Typography variant="inherit" sx={{ margin: 0 }}>
                            {cartItem.product?.product_name}
                          </Typography>
                        </Link>
                        <Typography variant="inherit">{cartItem.product?.price}</Typography>
                        <Typography variant="inherit" sx={{ color: '#007600' }}>
                          In Stock
                        </Typography>
                      </Box>
                    </Box>

                    <Box component="div" sx={{ paddingTop: 10, paddingLeft: 10, display: 'flex' }}>
                      <Icon
                        color="primary"
                        sx={{
                          '&:hover': {
                            opacity: 0.5
                          },
                          '&:active': {
                            opacity: 1
                          },
                          display: 'block'
                        }}
                      >
                        <IndeterminateCheckBoxIcon onClick={() => handleDecrement(cartItem)} />
                      </Icon>
                      <Box component="div" sx={{ marginRight: 20, marginLeft: 20 }}>
                        {cartItem.quantity}
                      </Box>
                      <Icon
                        color="primary"
                        sx={{
                          '&:hover': {
                            opacity: 0.5
                          },
                          '&:active': {
                            opacity: 1
                          },
                          display: 'block'
                        }}
                      >
                        <AddBoxIcon onClick={() => handleIncrement(cartItem)} />
                      </Icon>
                      <Icon color="inherit" sx={{ marginLeft: 10 }}>
                        <DeleteIcon onClick={() => handleDelete(cartItem)} />
                      </Icon>
                    </Box>
                  </Paper>
                ))}
              </Grid>
              <Grid item xs={12} sm={6} md>
                <Paper
                  sx={{
                    padding: theme.spacing(2),
                    color: theme.palette.text.secondary,
                    marginBottom: '1em'
                  }}
                >
                  <List>
                    <ListItem sx={{ display: 'block' }}>
                      <Box component="div" sx={{ margin: 'auto', width: '8em' }}>
                        <Typography variant="inherit">Total Price(${totalPrice})</Typography>
                        <Typography variant="inherit">Total Num({totalNum})</Typography>
                      </Box>
                    </ListItem>
                    <ListItem sx={{ justifyContent: 'center' }}>
                      <Button variant="contained" color="primary" onClick={() => handleCheckOut()}>
                        Check Out
                      </Button>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
        <CarouselContainer />
      </Box>
    </Layout>
  )
}

export default Cart
