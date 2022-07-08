//library
import Image from 'next/image'
import React from 'react'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'
import toast from 'react-hot-toast'
//mui component
import { Icon, Box, Grid, Button, List, ListItem, Paper, Typography } from '@mui/material'
import { Layout } from 'src/components/organisms'
import { ICartItem } from 'src/@types'
import { useRouter } from 'next/router'
import { CarouselContainer, Link } from 'src/components'
//icon
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
//private
import theme from 'src/theme'
// custom hook
import {
  fetcher,
  useGetCartServer,
  useDeleteCartItem,
  useIncCartItem,
  useDecCartItem,
  useGetCart,
  useGetProducts
} from '@/hooks/fetcher'

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
  const cart = useGetCartServer()
  return { props: { cart } }
}

const Cart = (cart: ICartItem[]) => {
  const { data: fetchCartItems, mutate } = useGetCart(cart)
  const router = useRouter()
  const handleDecrement = async (cartItem: ICartItem) => {
    const quantity = cartItem.quantity
    const productId = cartItem.product_id
    try {
      if (quantity == 1) {
        await useDeleteCartItem(productId)
        await mutate({ ...fetchCartItems, cartItem })
      } else {
        await useDecCartItem(productId)
        await mutate({ ...fetchCartItems, cartItem })
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
  const handleIncrement = async (cartItem: ICartItem) => {
    try {
      const productId = cartItem.product_id
      await useIncCartItem(productId)
      await mutate({ ...fetchCartItems, cartItem })
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log('Failed', err.message)
      } else {
        console.log('Unknown Failure', err)
      }
    }
  }
  const handleDelete = async (cartItem: ICartItem) => {
    const productId = cartItem.product_id
    try {
      await useDeleteCartItem(productId)
      await mutate({ ...fetchCartItems, cartItem })
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
  const totalNum = fetchCartItems?.reduce((total: number, cartItem: ICartItem): number => {
    return total + cartItem.quantity
  }, 0)
  const totalPrice = fetchCartItems?.reduce((total: number, cartItem: ICartItem): number => {
    const quantity = cartItem ? cartItem.quantity : 0
    const price = cartItem && cartItem.product ? cartItem.product.price : 0
    return total + quantity * price
  }, 0)

  return (
    <Layout>
      <Box component="div" sx={{ marginTop: '2em', marginBottom: '2em' }}>
        {fetchCartItems?.length === 0 ? (
          <Paper sx={{ padding: theme.spacing(5), color: theme.palette.text.secondary }}>
            <Typography variant="inherit">Cart is empty.</Typography>
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
                {fetchCartItems?.map((cartItem: ICartItem, index: number) => (
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
                          src={
                            cartItem.product && cartItem.product.images && cartItem.product.images[0]
                              ? cartItem.product.images[0].url
                              : ''
                          }
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
