import React, {useEffect, useState} from "react"
import type {NextPage} from "next"
import Link from "@material-ui/core/Link"
import {Layout} from "components/organisms"
import {api} from "services/apiClient"
import {GetServerSideProps} from "next"
import {setCookie, parseCookies, destroyCookie} from "nookies"
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

const Wishlist = ({props}: any) => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    let cookies = parseCookies()
    let token = cookies["token"]
    if (token) {
      api
        .get("/auth/me")
        .then((user) => {
          setUser(user.data.user)
        })
        .catch((err: any) => {
          console.log(err)
        })
    } else {
      Router.replace("/")
    }
  }, [])
  console.log("user", user)
  const {data, error, mutate} = WishlistGet()

  const wishlist = !data ? [] : data.data
  console.log("wishlist", wishlist)
  function removeItemHandler(item: any) {}

  return (
    <Layout>
      <Paper style={{padding: 30, marginTop: 50}}>
        <Typography>Shopping Cart</Typography>
        {wishlist.length === 0 ? (
          <div>
            Wishlist is empty.{" "}
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
                      {wishlist?.map((item: Product) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                {/* <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image> */}
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
                          <TableCell align="right">
                            {/* <Select
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
                            </Select> */}
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
                    {/* <Typography variant="h6">
                      Subtotal ({(wishlist as Array<Product>).reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : $
                      {(wishlist as Array<Product>).reduce((a, c) => a + c.quantity * c.price, 0)}
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
                    </Button> */}
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

export default Wishlist

// const useStyles: any = makeStyles(() => ({
//   checkout: {
//     width: "100%",
//     [theme.breakpoints.down("md")]: {
//       width: "10em",
//     },
//   },
// }))

// const Wishlist: NextPage = () => {
//   const classes = useStyles()
//   const {user, isAuthenticated} = useAuth()

//   useEffect(() => {
//     if (!isAuthenticated) {
//       const router = useRouter()
//       router.push("/") // redirects if there is no user
//     }
//   }, [isAuthenticated])
//   const removeItemHandler = (item: Product) => {}
//   // const {data, error} = WishlistGet()
//   // error && (
//   //   <div>
//   //     <div>failed to load</div>
//   //     <div>Please Signin</div>
//   //   </div>
//   // )
//   // if (!data) return <Circular />
//   // const wishlist = !data ? [] : data.data
//   const wishlist: any = []
//   console.log("wishlist product", wishlist)
//   if (!wishlist) {
//     return <div>Product Not Found</div>
//   }

//   const checkoutHandler = () => {
//     Router.push("/auth/signin")
//   }
//   return (
//     <Layout>
//       <Paper style={{padding: 30, marginTop: 50}}>
//         <Typography>Shopping Cart</Typography>
//         {wishlist.length === 0 ? (
//           <div>
//             Wishlist is empty.{" "}
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
//                       {wishlist?.map((item: Product) => (
//                         <TableRow key={item.id}>
//                           <TableCell>
//                             <NextLink href={`/product/${item.slug}`} passHref>
//                               <Link>
//                                 {/* <Image
//                                   src={item.image}
//                                   alt={item.name}
//                                   width={50}
//                                   height={50}
//                                 ></Image> */}
//                               </Link>
//                             </NextLink>
//                           </TableCell>
//                           <TableCell>
//                             <NextLink href={`/product/${item.slug}`} passHref>
//                               <Link>
//                                 <Typography>{item.product_name}</Typography>
//                               </Link>
//                             </NextLink>
//                           </TableCell>
//                           <TableCell align="right">
//                             {/* <Select
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
//                             </Select> */}
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
//                       Subtotal ({(wishlist as Array<Product>).reduce((a, c) => a + c.quantity, 0)}{" "}
//                       items) : $
//                       {(wishlist as Array<Product>).reduce((a, c) => a + c.quantity * c.price, 0)}
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
//         )}
//       </Paper>
//     </Layout>
//   )
// }

// export default Wishlist

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const products = await api.get("/products")
//   return {props: {products}}
// }
