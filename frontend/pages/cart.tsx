import * as React from 'react'
import type { NextPage } from 'next'
import Link from '@material-ui/core/Link'

import {
  Button,
  CardContent,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  CircularProgress,
  Table,
  TableBody,
  Grid,
  MenuItem,
  Select,
  List,
  ListItem,
  Typography,
  Card,
  Container,
  Box,
  Paper,
} from '@material-ui/core'
import Image from 'next/image'
import { Layout } from 'components/organisms'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { IProduct } from 'types'

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
    <>
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
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              ></Image>
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
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
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
    </>
  )
}

export default Cart
