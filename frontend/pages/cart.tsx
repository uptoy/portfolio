import * as React from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import { Layout } from 'components/organisms'
import { TableContainer } from '@mui/material'
import { TableHead } from '@mui/material'
import { TableRow } from '@mui/material'
import { Table } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { useRouter } from 'next/router'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Select from '@mui/material/Select'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import Button from '@mui/material/Button'

import { MenuItem } from '@mui/material'

import NextLink from 'next/link'

interface IProduct {
  quantity?: number
  name?: string
  slug?: string
  category?: string
  image?: string
  price?: number
  brand?: string
  rating?: number
  countInStock?: number
  description?: string
  _id?: string
  createdAt?: string
  updatedAt?: string
}

const item1: IProduct = {
  _id: '1',
  quantity: 1,
  name: 'name1',
  slug: 'slug1',
  category: 'category',
  image: 'image',
  price: 1,
  brand: 'brand',
  rating: 1,
  countInStock: 1,
  description: 'desc',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}
const item2: IProduct = {
  _id: '2',
  quantity: 1,
  name: 'name2',
  slug: 'slug2',
  category: 'category2',
  image: 'image2',
  price: 1,
  brand: 'brand2',
  rating: 1,
  countInStock: 1,
  description: 'desc2',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

const Cart: NextPage = () => {
  const router = useRouter()
  const cartItems = [item1, item2]
  const updateCartHandler = async (item: IProduct, quantity: number) => {}

  const removeItemHandler = (item: IProduct) => {}

  const checkoutHandler = () => {
    router.push('/shipping')
  }
  return (
    <Layout>
      <Typography component="h4" variant="h4">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.{' '}
          <NextLink href="/" passHref>
            <Link>Go shopping</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              {/* <Image src={item.image} alt={item.name} width={50} height={50}></Image> */}
                            </Link>
                          </NextLink>
                        </TableCell>

                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Typography>{item.name}</Typography>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell align="right">
                          <Select
                            labelId="item-quantity"
                            label="Quantity"
                            id="item-quantity"
                            value={item.quantity}
                            onChange={(e) => updateCartHandler(item, e.target.value as number)}
                          >
                            {/* {[...Array(item.countInStock).keys()].map((x) => ( */}
                            {/* <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))} */}
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell align="right">${item.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeItemHandler(item)}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h6">
                    Subtotal ({(cartItems as Array<IProduct>).reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {(cartItems as Array<IProduct>).reduce((a, c) => a + c.quantity * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button variant="contained" color="primary" fullWidth onClick={checkoutHandler}>
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  )
}

export default Cart
