import * as React from "react"
import type {NextPage} from "next"
import Link from "@material-ui/core/Link"
import {Layout} from "components/organisms"
import {
  Button,
  CardContent,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  Grid,
  MenuItem,
  Select,
  List,
  ListItem,
  Typography,
  Card,
  Paper,
} from "@material-ui/core"
import {Circular} from "components/common/Circular"
import Image from "next/image"
import {useRouter} from "next/router"
import NextLink from "next/link"
import {Product} from "types"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import {useCart} from "lib/api/product"
// import {products} from "utils/seed"

const useStyles: any = makeStyles(() => ({
  checkout: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "10em",
    },
  },
}))

const Cart: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()
  // const updateCartHandler = async (item: Product, quantity: number) => {}
  const removeItemHandler = (item: Product) => {}

  const {data, error} = useCart(id)
  if (error) return <div>failed to load</div>
  // if (!data) return <Circular />
  const product = data.data
  if (!product) {
    return <div>Product Not Found</div>
  }

  const checkoutHandler = () => {
    router.push("/checkout")
  }
  return (
    <Layout>
      <Paper style={{padding: 30, marginTop: 50}}>
        <Typography>Shopping Cart</Typography>
        {cartItems.length === 0 ? (
          <div>
            Cart is empty.{" "}
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
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item: Product) => (
                        <TableRow key={item.id}>
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
                          <TableCell align="center">
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
                  <ListItem style={{justifyContent: "center"}}>
                    <Typography variant="h6">
                      Subtotal ({(cartItems as Array<IProduct>).reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : $
                      {(cartItems as Array<IProduct>).reduce((a, c) => a + c.quantity * c.price, 0)}
                    </Typography>
                  </ListItem>
                  <ListItem style={{justifyContent: "center"}}>
                    <Button
                      variant="contained"
                      className={classes.checkout}
                      color="primary"
                      onClick={checkoutHandler}
                    >
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Layout>
  )
}

export default Cart
