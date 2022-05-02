import * as React from "react"
import type {NextPage} from "next"
import Link from "@material-ui/core/Link"
import {Layout} from "components/organisms"
import useSWR from "swr"
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
import Image from "next/image"
import {useRouter} from "next/router"
import NextLink from "next/link"
import {Product} from "@types"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import {products} from "utils/seed"
import {GetServerSidePropsContext, GetServerSideProps} from "next"
import {useAuth} from "context/AuthContext"
const BaseURL = "http://localhost:8080/api"

const useStyles: any = makeStyles(() => ({
  checkout: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "10em",
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
  const fetchCartItems = data?.data
  console.log("cart", fetchCartItems)
  // const WishlistDelete = async (product: Product) => {
  //   const res = await fetch(`${BaseURL}/wishlist/${product.id}`, {
  //     method: "DELETE",
  //     headers: {"Content-Type": "application/json"},
  //     credentials: "include",
  //   })
  // }
  // const {isAuthenticated} = useAuth()
  // const cartItems = products
  // const updateCartHandler = async (item: Product, quantity: number) => {}

  // const removeItemHandler = (item: Product) => {}

  // const checkoutHandler = () => {
  //   router.push("/checkout")
  // }
  // return (
  //   <Layout>
  //     <Paper style={{padding: 30, marginTop: 50}}>
  //       <Typography>Shopping Cart</Typography>
  //       {fetchCartItems.length === 0 ? (
  //         <div>
  //           Cart is empty.
  //           <NextLink href="/" passHref>
  //             <Link>Go shopping</Link>
  //           </NextLink>
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
  //                     {fetchCartItems.map((item: Product) => (
  //                       <TableRow key={item.id}>
  //                         <TableCell>
  //                           <NextLink href={`/product/${item.slug}`} passHref>
  //                             <Link>
  //                               <Image
  //                                 src={item.images[0].url}
  //                                 alt={item.product_name}
  //                                 width={50}
  //                                 height={50}
  //                               ></Image>
  //                             </Link>
  //                           </NextLink>
  //                         </TableCell>
  //                         <TableCell>
  //                           <NextLink href={`/product/${item.slug}`} passHref>
  //                             <Link>
  //                               <Typography>{item.product_name}</Typography>
  //                             </Link>
  //                           </NextLink>
  //                         </TableCell>
  //                         <TableCell align="right">
  //                           <Select
  //                             labelId="item-quantity"
  //                             id="item-quantity"
  //                             value={item.quantity}
  //                             onChange={(e) => updateCartHandler(item, e.target.value as number)}
  //                           >
  //                             {[...Array(item.countInStock).keys()].map((x) => (
  //                               <MenuItem key={x + 1} value={x + 1}>
  //                                 {x + 1}
  //                               </MenuItem>
  //                             ))}
  //                             <MenuItem value={1}>1</MenuItem>
  //                             <MenuItem value={2}>2</MenuItem>
  //                             <MenuItem value={3}>3</MenuItem>
  //                           </Select>
  //                         </TableCell>
  //                         <TableCell align="right">${item.price}</TableCell>
  //                         <TableCell align="center">
  //                           <Button
  //                             variant="contained"
  //                             color="secondary"
  //                             onClick={() => removeItemHandler(item)}
  //                           >
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
  //                   <Typography variant="h6">
  //                     Subtotal ({(cartItems as Array<IProduct>).reduce((a, c) => a + c.quantity, 0)}{" "}
  //                     items) : $
  //                     {(cartItems as Array<IProduct>).reduce((a, c) => a + c.quantity * c.price, 0)}
  //                   </Typography>
  //                 </ListItem>
  //                 <ListItem style={{justifyContent: "center"}}>
  //                   <Button
  //                     variant="contained"
  //                     className={classes.checkout}
  //                     color="primary"
  //                     onClick={checkoutHandler}
  //                   >
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
  return <div></div>
}

export default Cart
