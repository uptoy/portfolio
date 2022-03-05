import * as React from 'react'
import type { NextPage } from 'next'
import Link from 'components/Link'
import {
  Button,
  TableBody,
  TableCell,
  Table,
  TableRow,
  TableContainer,
  TableHead,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
} from '@material-ui/core'
import { Layout } from 'components/organisms'
import NextLink from 'next/link'
import CheckoutWizard from 'components/CheckoutWizard'
import Image from 'next/image'

const PlaceOrder: NextPage = () => {
  const item1 = {
    _id: '',
    iamge: '',
    name: '',
    quantity: '',
    price: '',
    image: '',
    slug: '',
  }
  const item2 = {
    _id: '',
    iamge: '',
    name: '',
    quantity: '',
    price: '',
    image: '',
    slug: '',
  }
  const cartItems = [item1, item2]
  const placeOrderHandler = () => {}
  const shippingPrice = 100
  const taxPrice = 100
  const totalPrice = 100
  const paymentMethod = 'credit'
  const loading = false
  const itemsPrice = 100
  const shippingAddress = {
    fullName: 'fullname',
    address: 'address',
    postalCode: 'postalCode',
    country: 'country',
    city: 'city',
  }
  return (
    <Layout>
      <CheckoutWizard activeStep={3}></CheckoutWizard>
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress?.fullName}, {shippingAddress?.address}, {shippingAddress?.city},{' '}
                {shippingAddress?.postalCode}, {shippingAddress?.country}
              </ListItem>
            </List>
          </Card>
          <Card>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              ></Image>
                            </NextLink>
                          </TableCell>

                          <TableCell>
                            <Link href={`/product/${item.slug}`} passHref>
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>${item.price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${shippingPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>${totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button onClick={placeOrderHandler} variant="contained" color="primary" fullWidth>
                  Place Order
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default PlaceOrder
