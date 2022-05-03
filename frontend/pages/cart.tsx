import type {NextPage} from "next"
import Image from "next/image"
import React, {useEffect} from "react"
import theme from "theme"
import {GetServerSidePropsContext, GetServerSideProps} from "next"
import {
  Typography,
  Grid,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Card,
  List,
  ListItem,
} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {Layout} from "components/organisms"
import {red, common} from "@material-ui/core/colors"
import {CartItem} from "@types"
import {useAuth} from "context/AuthContext"
import {useRouter} from "next/router"
import useSWR from "swr"
import {Link} from "components"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import {Icon} from "@material-ui/core"

const BaseURL = "http://localhost:8080/api"

const useStyles: any = makeStyles(() => ({
  cardGrid: {
    padding: theme.spacing(4, 0),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "80%",
  },
  cardContent: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0.25),
  },
  cardActions: {
    justifyContent: "space-between",
  },
  numReviews: {
    marginLeft: theme.spacing(1),
    color: common.black,
  },
  favorite: {
    minWidth: 30,
    color: red[500],
    marginRight: theme.spacing(1),
    fontSize: "2em",
  },
  icon: {
    "&:hover": {
      color: common.black,
    },
    "&:active": {
      color: red[500],
    },
  },
}))

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await fetch(`${BaseURL}/cart`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  })
  const cart = await res.json()
  return {props: {cart}}
}

const Cart: NextPage = ({cart}: any) => {
  const fetcher = (url: any) =>
    fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    }).then((r) => r.json())
  const {data, error, mutate} = useSWR(`${BaseURL}/cart`, fetcher, {
    fallbackData: cart,
    revalidateOnMount: true,
  })
  const router = useRouter()
  const classes = useStyles()
  const fetchCartItems = data.data
  const {isAuthenticated} = useAuth()
  const handleDecrement = async (cartItem: CartItem) => {
    const productId = cartItem.product_id
    const quantity = cartItem.quantity
    if (quantity == 1) {
      await fetch(`${BaseURL}/cart/${productId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      })
      await mutate({...data, cartItem})
    } else {
      await fetch(`${BaseURL}/cart/dec/${productId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      })
      await mutate({...data, cartItem})
    }
  }
  const handleIncrement = async (cartItem: CartItem) => {
    console.log("cartItem", cartItem.product_id)
    const productId = cartItem.product_id
    await fetch(`${BaseURL}/cart/inc/${productId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    })
    await mutate({...data, cartItem})
  }
  const handleDelete = async (cartItem: CartItem) => {
    const productId = cartItem.product_id
    await fetch(`${BaseURL}/cart/${productId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    })
    await mutate({...data, cartItem})
  }
  const handleCheckOut = async () => {
    router.push("/checkout")
  }
  // const WishlistCreate = async (product: Product) => {
  //   const res = await fetch(`${BaseURL}/wishlist`, {
  //     method: "POST",
  //     headers: {"Content-Type": "application/json"},
  //     credentials: "include",
  //     body: JSON.stringify(product),
  //   })
  // }
  // const handleClick = useCallback(
  //   (product: Product) => {
  //     ;(() => {
  //       const wishlistHandler = async () => {
  //         if (wishlistIdList?.includes(product.id) == true) {
  //           await WishlistDelete(product)
  //         } else {
  //           await WishlistCreate(product)
  //         }
  //         await mutate({...data, product})
  //       }
  //       isAuthenticated ? wishlistHandler() : router.push("/auth/signup")
  //     })()
  //   },
  //   [isAuthenticated, wishlistIdList]
  // )

  return (
    <Layout>
      <div>
        {fetchCartItems?.length === 0 ? (
          <div>
            Cart is empty.
            <Link href="/" passHref>
              Go shopping
            </Link>
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
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fetchCartItems?.map((cartItem: CartItem, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Link href={`/product/${cartItem.product_id}`} passHref>
                              <Image
                                src={cartItem.product.images[0].url}
                                alt={cartItem.product.product_name}
                                width={50}
                                height={50}
                              ></Image>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link href={`/product/${cartItem.product_id}`} passHref>
                              <Typography>{cartItem.product.product_name}</Typography>
                            </Link>
                          </TableCell>
                          <TableCell align="center">{cartItem.quantity}</TableCell>
                          <TableCell align="center">{cartItem.product.price}</TableCell>
                          <TableCell align="center">
                            <Icon color="primary" className={classes.icon}>
                              <RemoveCircleOutlineIcon onClick={() => handleDecrement(cartItem)} />
                            </Icon>
                            <Icon color="primary" className={classes.icon}>
                              <HighlightOffIcon onClick={() => handleDelete(cartItem)} />
                            </Icon>
                            <Icon color="primary" className={classes.icon}>
                              <AddCircleOutlineIcon onClick={() => handleIncrement(cartItem)} />
                            </Icon>
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
                    {/* <Typography variant="h6">
                      Subtotal (
                      {(fetchCartItems as Array<CartItem>).reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : $
                      {(fetchCartItems as Array<CartItem>).reduce(
                        (a, c) => (a + c.quantity * c.product.price) as number,
                        0
                      )}
                    </Typography> */}
                  </ListItem>
                  <ListItem style={{justifyContent: "center"}}>
                    <Button
                      variant="contained"
                      className={classes.checkout}
                      color="primary"
                      onClick={() => handleCheckOut()}
                    >
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    </Layout>
  )
}

export default Cart
