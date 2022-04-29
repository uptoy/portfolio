import React, {useEffect, useState} from "react"
import type {NextPage} from "next"
import Link from "@material-ui/core/Link"
import {Layout} from "components/organisms"
import {api} from "services/apiClient"
import {GetServerSideProps} from "next"
import {Rating, Carousel} from "components"
import {Average} from "utils/average"
import {common} from "@material-ui/core/colors"
import {Review} from "@types"
import {getAPIClient} from "services/axios"
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
// import {useRouter} from "next/router"
import Router from "next/router"

import NextLink from "next/link"
import {Product} from "@types"
import {Circular} from "components/common/Circular"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import {WishlistGet, WishlistCreate, WishlistDelete} from "services/api/wishlist"
import {useAuth} from "context/AuthContext"
import {useRouter} from "next/router"
import {User} from "context/AuthContext"

const Cart = ({props}: any) => {
  const useStyles: any = makeStyles(() => ({
    numReviews: {
      marginLeft: theme.spacing(1),
      color: common.black,
    },
  }))
  const [user, setUser] = useState<User | null>(null)
  const classes = useStyles()
  const {data, error} = WishlistGet()
  // if (error) return <div>failed to load</div>
  const cart = !data ? [] : data.data
  console.log("cart", cart)
  function removeItemHandler(item: any) {}

  return (
    <Layout>
      <Paper style={{padding: 30, marginTop: 50}}>
        <Typography>Cart</Typography>
        {cart.length === 0 ? (
          <div>
            Cart is empty.{" "}
            <NextLink href="/" passHref>
              <Link>Go shopping</Link>
            </NextLink>
          </div>
        ) : (
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Review</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart?.map((item: Product) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.images[0].url}
                                  alt={item.product_name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.product_name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="center">
                            <p>{item.category.category_name}</p>
                          </TableCell>
                          <TableCell align="right">${item.price}</TableCell>
                          <TableCell align="center">
                            {item.reviews ? (
                              <div style={{display: "flex", justifyContent: "center"}}>
                                <Rating
                                  value={Average(
                                    item.reviews.map((review: Review) => review.rating)
                                  )}
                                />
                                <Typography className={classes.numReviews}>
                                  ({item.reviews.length})
                                </Typography>
                              </div>
                            ) : (
                              <Typography className={classes.numReviews}>No reviews yet</Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Layout>
  )
}

export default Cart

// import React, {useEffect, useState} from "react"
// import type {NextPage} from "next"
// import Link from "@material-ui/core/Link"
// import {Layout} from "components/organisms"
// import {GetServerSideProps} from "next"
// import {
//   Button,
//   CardContent,
//   TableCell,
//   TableRow,
//   TableContainer,
//   TableHead,
//   Table,
//   TableBody,
//   Grid,
//   MenuItem,
//   Select,
//   List,
//   ListItem,
//   Typography,
//   Card,
//   Paper,
// } from "@material-ui/core"
// import Image from "next/image"
// import {useRouter} from "next/router"
// import NextLink from "next/link"
// import {Product} from "@types"
// import {Circular} from "components/common/Circular"
// import {makeStyles} from "@material-ui/styles"
// import theme from "theme"
// import {CartGet} from "services/api/cart"
// import {useAuth} from "context/AuthContext"

// const useStyles: any = makeStyles(() => ({
//   checkout: {
//     width: "100%",
//     [theme.breakpoints.down("md")]: {
//       width: "10em",
//     },
//   },
// }))

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const {user, isAuthenticated} = useAuth()
//   return {props: {user, isAuthenticated}}
// }

// const Cart: NextPage = ({props}: any) => {
//   const classes = useStyles()
//   const router = useRouter()
//   const {user, isAuthenticated} = useAuth()
//   if (isAuthenticated == false) {
//     console.log("isAuthenticated",isAuthenticated)
//   }
//   console.log("cart isAuthenticated", isAuthenticated)
//   console.log("cart user", user)

//   // const updateCartHandler = async (item: Product, quantity: number) => {}
//   const removeItemHandler = (item: Product) => {}
//   const {data, error} = CartGet()
//   error && (
//     <div>
//       <div>failed to load</div>
//       <div>Please Signin</div>
//     </div>
//   )
//   if (!data) return <Circular />
//   const product = data.data
//   console.log("cart product", product)
//   if (!product) {
//     return <div>Product Not Found</div>
//   }

//   const checkoutHandler = () => {
//     router.push("/checkout")
//   }
//   return (
//     <Layout>
//       <Paper style={{padding: 30, marginTop: 50}}>
//         {/* <Typography>Shopping Cart</Typography>
//         {cartItems.length === 0 ? (
//           <div>
//             Cart is empty.{" "}
//             <NextLink href="/" passHref>
//               <Link>Go shopping</Link>
//             </NextLink>
//           </div>
//         ) : (
//           <Grid container spacing={1}>
//             <Grid item md={9} xs={12}>
//               <CardContent>
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Image</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell align="right">Quantity</TableCell>
//                         <TableCell align="right">Price</TableCell>
//                         <TableCell align="center">Action</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {cartItems.map((item: Product) => (
//                         <TableRow key={item.id}>
//                           <TableCell>
//                             <NextLink href={`/product/${item.slug}`} passHref>
//                               <Link>
//                                 <Image
//                                   src={item.image}
//                                   alt={item.name}
//                                   width={50}
//                                   height={50}
//                                 ></Image>
//                               </Link>
//                             </NextLink>
//                           </TableCell>

//                           <TableCell>
//                             <NextLink href={`/product/${item.slug}`} passHref>
//                               <Link>
//                                 <Typography>{item.name}</Typography>
//                               </Link>
//                             </NextLink>
//                           </TableCell>
//                           <TableCell align="right">
//                             <Select
//                               labelId="item-quantity"
//                               id="item-quantity"
//                               value={item.quantity}
//                               onChange={(e) => updateCartHandler(item, e.target.value as number)}
//                             >
//                               {[...Array(item.countInStock).keys()].map((x) => (
//                                 <MenuItem key={x + 1} value={x + 1}>
//                                   {x + 1}
//                                 </MenuItem>
//                               ))}
//                               <MenuItem value={1}>1</MenuItem>
//                               <MenuItem value={2}>2</MenuItem>
//                               <MenuItem value={3}>3</MenuItem>
//                             </Select>
//                           </TableCell>
//                           <TableCell align="right">${item.price}</TableCell>
//                           <TableCell align="center">
//                             <Button
//                               variant="contained"
//                               color="secondary"
//                               onClick={() => removeItemHandler(item)}
//                             >
//                               x
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </CardContent>
//             </Grid>
//             <Grid item md={3} xs={12}>
//               <Card>
//                 <List>
//                   <ListItem style={{justifyContent: "center"}}>
//                     <Typography variant="h6">
//                       Subtotal ({(cartItems as Array<IProduct>).reduce((a, c) => a + c.quantity, 0)}{" "}
//                       items) : $
//                       {(cartItems as Array<IProduct>).reduce((a, c) => a + c.quantity * c.price, 0)}
//                     </Typography>
//                   </ListItem>
//                   <ListItem style={{justifyContent: "center"}}>
//                     <Button
//                       variant="contained"
//                       className={classes.checkout}
//                       color="primary"
//                       onClick={checkoutHandler}
//                     >
//                       Check Out
//                     </Button>
//                   </ListItem>
//                 </List>
//               </Card>
//             </Grid>
//           </Grid>
//         )} */}
//       </Paper>
//     </Layout>
//   )
// }

// export default Cart
