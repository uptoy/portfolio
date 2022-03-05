import * as React from 'react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { Layout } from 'components/organisms'
import {
  ListItemText,
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

export type ShippingAddressType = {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface IUser {
  name: string
  email: string
  password?: string
  isAdmin: boolean
  _id?: string
  createdAt?: string
  updatedAt?: string
}

export interface IOrderItems {
  name: string
  quantity: number
  image: string
  price: number
  _id?: string
}
export interface IPaymentResult {
  id: string
  email_address: string
  status: string
}

export interface IOrder {
  user: IUser
  orderItems: Array<IOrderItems>
  shippingAddress: ShippingAddressType
  paymentMethod: string
  paymentResult?: IPaymentResult
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  paidAt?: string
  deliveredAt?: string
  _id?: string
  createdAt?: string
  updatedAt?: string
}

const paymentResult = {
  id: 'id',
  email_address: 'email_address',
  status: 'status',
}
const shippingAddress = {
  fullName: 'fullName',
  address: 'address',
  city: 'city',
  postalCode: 'postalCode',
  country: 'country',
}

const user1 = {
  name: 'name',
  email: 'email',
  password: 'password',
  isAdmin: true,
  _id: '_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}
const orderItems = [
  {
    name: 'name',
    quantity: 1,
    image: 'image',
    price: 1,
    _id: '_id',
  },
  {
    name: 'name2',
    quantity: 2,
    image: 'image2',
    price: 2,
    _id: '_id2',
  },
]
const OrderHistory: NextPage = () => {
  const order1 = {
    user: user1,
    orderItems: orderItems,
    shippingAddress: shippingAddress,
    paymentMethod: 'paymentMethod',
    paymentResult: paymentResult,
    itemsPrice: 1,
    _id: '_id',
    createdAt: 'createdAt',
    shippingPrice: 1,
    taxPrice: 1,
    totalPrice: 1,
    isPaid: true,
    paidAt: 'paidAt',
    isDelivered: true,
    deliveredAt: 'deliveredAt',
    updatedAt: 'updatedAt',
  }
  const orders = [order1]
  const loading = false
  const error = false
  return (
    <Layout>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem button component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/order-history" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Order History"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Order History
                </Typography>
              </ListItem>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography>{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>DATE</TableCell>
                          <TableCell>TOTAL</TableCell>
                          <TableCell>PAID</TableCell>
                          <TableCell>DELIVERED</TableCell>
                          <TableCell>ACTION</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(orders as IOrder[]).map((order) => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id?.substring(20, 24)}</TableCell>
                            <TableCell>{order.createdAt}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell>
                              {order.isPaid ? `paid at ${order.paidAt}` : 'not paid'}
                            </TableCell>
                            <TableCell>
                              {order.isDelivered
                                ? `delivered at ${order.deliveredAt}`
                                : 'not delivered'}
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/order/${order._id}`} passHref>
                                <Button variant="contained">Details</Button>
                              </NextLink>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default OrderHistory
