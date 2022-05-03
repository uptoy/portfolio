import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import React, {useEffect} from "react"
import theme from "theme"
import {Rating, Carousel} from "components"
import {MainFeaturedPost} from "components/productTop"
import {GetServerSidePropsContext, GetServerSideProps} from "next"
import {
  Typography,
  Grid,
  Container,
  CardContent,
  CardMedia,
  Paper,
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
import {CartItem, Product} from "@types"
import {useAuth} from "context/AuthContext"
import {Review} from "@types"
import {Average} from "utils/average"
import {useRouter} from "next/router"
import useSWR from "swr"
import {fetcher} from "services/fetcher"
import {Link} from "components"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
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
  console.log("fetchCartItems", fetchCartItems)
  const {isAuthenticated} = useAuth()

  console.log("isAuthenticated", isAuthenticated)
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
                            <Icon color="primary">
                              <RemoveCircleOutlineIcon />
                            </Icon>
                            <Icon color="primary">
                              <HighlightOffIcon />
                            </Icon>
                            <Icon color="primary">
                              <AddCircleOutlineIcon />
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
                    <Typography variant="h6">
                      {/* Subtotal (
                      {(fetchCartItems as Array<CartItem>).reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : $
                      {(fetchCartItems as Array<CartItem>).reduce(
                        (a, c) => a + c.quantity * c.,
                        0
                      )} */}
                    </Typography>
                  </ListItem>
                  <ListItem style={{justifyContent: "center"}}>
                    <Button variant="contained" className={classes.checkout} color="primary">
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
  // return (
  //   <Layout>
  //     <Paper style={{padding: 30, marginTop: 50}}>
  //       <Typography>Shopping Cart</Typography>
  //       {fetchCartItems.length === 0 ? (
  //         <div>
  //           Cart is empty.
  //           <Link href="/" passHref>
  //             Go shopping
  //           </Link>
  //         </div>
  //       ) : (
  //         <Grid container spacing={1}>
  //           <Grid item md={9} xs={12}>
  //             <CardContent>
  //               <TableContainer>
  //                 <Table>
  //                   <TableHead>
  //                     <TableRow>
  //                       <TableCell>Image</TableCell>
  //                       <TableCell>Name</TableCell>
  //                       <TableCell align="right">Quantity</TableCell>
  //                       <TableCell align="right">Price</TableCell>
  //                       <TableCell align="center">Action</TableCell>
  //                     </TableRow>
  //                   </TableHead>
  //                   <TableBody>
  //                     {fetchCartItems.map((cartItem: CartItem) => (
  //                       <TableRow key={cartItem.product_id}>
  //                         <TableCell>
  //                           <Link href={`/product/${cartItem.product_id}`} passHref>
  //                             {/* <Image
  //                               src={item.images[0].url}
  //                               alt={item.product_name}
  //                               width={50}
  //                               height={50}
  //                             ></Image> */}
  //                           </Link>
  //                         </TableCell>
  //                         <TableCell>
  //                           <Link href={`/product/${cartItem.product_id}`} passHref>
  //                             {/* <Typography>{cartItem.}</Typography> */}
  //                           </Link>
  //                         </TableCell>
  //                         <TableCell align="right"></TableCell>
  //                         {/* <TableCell align="right">${item.price}</TableCell> */}
  //                         <TableCell align="right"></TableCell>
  //                         <TableCell align="center">
  //                           <Button variant="contained" color="secondary">
  //                             x
  //                           </Button>
  //                         </TableCell>
  //                       </TableRow>
  //                     ))}
  //                   </TableBody>
  //                 </Table>
  //               </TableContainer>
  //             </CardContent>
  //           </Grid>
  //           <Grid item md={3} xs={12}>
  //             <Card>
  //               <List>
  //                 <ListItem style={{justifyContent: "center"}}>
  //                   {/* <Typography variant="h6">
  //                     Subtotal (
  //                     {(fetchCartItems as Array<CartItem>).reduce((a, c) => a + c.quantity, 0)}{" "}
  //                     items) : $
  //                     {(fetchCartItems as Array<CartItem>).reduce(
  //                       (a, c) => a + c.quantity * c.price,
  //                       0
  //                     )}
  //                   </Typography> */}
  //                   aaa
  //                 </ListItem>
  //                 <ListItem style={{justifyContent: "center"}}>
  //                   <Button variant="contained" className={classes.checkout} color="primary">
  //                     Check Out
  //                   </Button>
  //                 </ListItem>
  //               </List>
  //             </Card>
  //           </Grid>
  //         </Grid>
  //       )}
  //     </Paper>
  //   </Layout>
  // )
}

export default Cart
