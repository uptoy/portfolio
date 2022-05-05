import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import React, {useCallback} from "react"
import theme from "theme"
import {Rating, Carousel} from "components"
import {GetServerSidePropsContext, GetServerSideProps} from "next"
import {
  Typography,
  Grid,
  Container,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {Layout} from "components/organisms"
import {red, common} from "@material-ui/core/colors"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import {Product} from "@types"
import {useAuth} from "context/AuthContext"
import {Review} from "@types"
import {Average} from "utils/average"
import {useRouter} from "next/router"
import {api} from "services/apiClient"
import useSWR from "swr"
import {fetcher} from "services/fetcher"
import {Link} from "components"
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
  const res = await fetch(`${BaseURL}/products`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  })
  const products = await res.json()
  const res1 = await fetch(`${BaseURL}/wishlist`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  })
  const wishlist = await res1.json()
  return {props: {products, wishlist}}
}

const Wishlist: NextPage = ({products, wishlist}: any) => {
  const fetcher = (url: any) =>
    fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    }).then((r) => r.json())
  const {data, error, mutate} = useSWR(`${BaseURL}/wishlist`, fetcher, {
    fallbackData: wishlist,
    revalidateOnMount: true,
  })
  const router = useRouter()
  const classes = useStyles()
  const fetchProducts = products.data
  const fetchWishlist = data.data
  const WishlistDelete = async (product: Product) => {
    const res = await fetch(`${BaseURL}/wishlist/${product.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    })
  }
  const {isAuthenticated} = useAuth()
  const wishlistIdList = fetchWishlist?.map((p: any) => p.id)
  const handleClick = useCallback(
    (product: Product) => {
      ;(() => {
        const wishlistHandler = async () => {
          if (wishlistIdList?.includes(product.id) == true) {
            await WishlistDelete(product)
          } else {
            // await WishlistCreate(product)
            console.log("aaa")
          }
          await mutate({...data, product})
        }
        isAuthenticated ? wishlistHandler() : router.push("/auth/signup")
      })()
    },
    [isAuthenticated, wishlistIdList]
  )
  return (
    <Layout>
      <Container className={classes.cardGrid} maxWidth="xl">
        <Paper style={{padding: 30, marginTop: 50}}>
          <Typography>Wishlist</Typography>
          {wishlist.length === 0 ? (
            <div>
              Wishlist is empty.{" "}
              <Link href="/" passHref>
                Go shopping
              </Link>
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
                        {fetchWishlist?.map((item: Product) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Link href={`/products/${item.id}`} passHref>
                                <Image
                                  src={item.images[0].url}
                                  alt={item.product_name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link href={`/products/${item.id}`} passHref>
                                <Typography>{item.product_name}</Typography>
                              </Link>
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
                                <Typography className={classes.numReviews}>
                                  No reviews yet
                                </Typography>
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
      </Container>
    </Layout>
  )
}

export default Wishlist

// import Head from "next/head"
// import React, {SyntheticEvent, useState, useEffect, useCallback} from "react"
// import {Rating, Carousel} from "components"
// import {MainFeaturedPost} from "components/productTop"
// import {
//   Container,
//   Button,
//   CardActions,
//   CardContent,
//   CardMedia,
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
// import {GetServerSidePropsContext, GetServerSideProps} from "next"
// import {red, common} from "@material-ui/core/colors"
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
// import FavoriteIcon from "@material-ui/icons/Favorite"
// import {Products} from "services/api/product"
// import type {NextPage} from "next"
// import Link from "@material-ui/core/Link"
// import {Layout} from "components/organisms"
// import Image from "next/image"
// // import {useRouter} from "next/router"
// import Router from "next/router"

// import NextLink from "next/link"
// import {Product} from "@types"
// import {Circular} from "components/common/Circular"
// import {makeStyles} from "@material-ui/styles"
// import theme from "theme"
// import {WishlistGet, WishlistCreate, WishlistDelete} from "services/api/wishlist"
// import {useAuth} from "context/AuthContext"
// import {useRouter} from "next/router"
// import {User} from "context/AuthContext"
// import {Review} from "@types"
// import {Average} from "utils/average"
// import {api} from "services/apiClient"
// import useSWR from "swr"
// import {fetcher} from "services/fetcher"
// const BaseURL = "http://localhost:8080/api"

// const useStyles: any = makeStyles(() => ({
//   cardGrid: {
//     padding: theme.spacing(4, 0),
//   },
//   card: {
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//   },
//   cardMedia: {
//     paddingTop: "80%",
//   },
//   cardContent: {
//     flexGrow: 1,
//     paddingTop: theme.spacing(2),
//     paddingBottom: theme.spacing(0.25),
//   },
//   cardActions: {
//     justifyContent: "space-between",
//   },
//   numReviews: {
//     marginLeft: theme.spacing(1),
//     color: common.black,
//   },
//   favorite: {
//     minWidth: 30,
//     color: red[500],
//     marginRight: theme.spacing(1),
//     fontSize: "2em",
//   },
// }))

// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const res = await fetch(`${BaseURL}/products`, {
//     method: "GET",
//     headers: {"Content-Type": "application/json"},
//     credentials: "include",
//   })
//   const products = await res.json()
//   const res1 = await fetch(`${BaseURL}/wishlist`, {
//     method: "GET",
//     headers: {"Content-Type": "application/json"},
//     credentials: "include",
//   })
//   const wishlist = await res1.json()
//   return {props: {products, wishlist}}
// }

// const Wishlist: NextPage = ({products, wishlist}: any) => {
//   const fetcher = (url: any) =>
//     fetch(url, {
//       method: "GET",
//       headers: {"Content-Type": "application/json"},
//       credentials: "include",
//     }).then((r) => r.json())
//   const {data, error, mutate} = useSWR(`${BaseURL}/wishlist`, fetcher, {
//     fallbackData: wishlist,
//     revalidateOnMount: true,
//   })
//   const router = useRouter()
//   const classes = useStyles()
//   const fetchProducts = products.data
//   const fetchWishlist = data.data
//   const WishlistDelete = async (product: Product) => {
//     const res = await fetch(`${BaseURL}/wishlist/${product.id}`, {
//       method: "DELETE",
//       headers: {"Content-Type": "application/json"},
//       credentials: "include",
//     })
//   }
//   const WishlistCreate = async (product: Product) => {
//     const res = await fetch(`${BaseURL}/wishlist`, {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       credentials: "include",
//       body: JSON.stringify(product),
//     })
//   }
//   const {isAuthenticated} = useAuth()
//   const wishlistIdList = fetchWishlist?.map((p: any) => p.id)
//   const handleClick = useCallback(
//     (product: Product) => {
//       ;(() => {
//         const wishlistHandler = async () => {
//           if (wishlistIdList?.includes(product.id) == true) {
//             await WishlistDelete(product)
//           } else {
//             await WishlistCreate(product)
//           }
//           await mutate({...data, product})
//         }
//         isAuthenticated ? wishlistHandler() : router.push("/auth/signup")
//       })()
//     },
//     [isAuthenticated, wishlistIdList]
//   )
//   return (
//     <Layout>
//       <Paper style={{padding: 30, marginTop: 50}}>
//         <Typography>Wishlist</Typography>
//         {wishlist.length === 0 ? (
//           <div>
//             Wishlist is empty.{" "}
//             <NextLink href="/" passHref>
//               <Link>Go shopping</Link>
//             </NextLink>
//           </div>
//         ) : (
//           <Grid container spacing={1}>
//             <Grid item md={12} xs={12}>
//               <CardContent>
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Image</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell align="center">Category</TableCell>
//                         <TableCell align="right">Price</TableCell>
//                         <TableCell align="center">Review</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {wishlist?.map((item: Product) => (
//                         <TableRow key={item.id}>
//                           <TableCell>
//                             <NextLink href={`/product/${item.slug}`} passHref>
//                               <Link>
//                                 <Image
//                                   src={item.images[0].url}
//                                   alt={item.product_name}
//                                   width={50}
//                                   height={50}
//                                 ></Image>
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
//                           <TableCell align="center">
//                             <p>{item.category.category_name}</p>
//                           </TableCell>
//                           <TableCell align="right">${item.price}</TableCell>
//                           <TableCell align="center">
//                             {item.reviews ? (
//                               <div style={{display: "flex", justifyContent: "center"}}>
//                                 <Rating
//                                   value={Average(
//                                     item.reviews.map((review: Review) => review.rating)
//                                   )}
//                                 />
//                                 <Typography className={classes.numReviews}>
//                                   ({item.reviews.length})
//                                 </Typography>
//                               </div>
//                             ) : (
//                               <Typography className={classes.numReviews}>No reviews yet</Typography>
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </CardContent>
//             </Grid>
//           </Grid>
//         )}
//       </Paper>
//     </Layout>
//   )
// }

// export default Wishlist

// // import React, {useEffect, useState} from "react"
// // import type {NextPage} from "next"
// // import Link from "@material-ui/core/Link"
// // import {Layout} from "components/organisms"
// // import {api} from "services/apiClient"
// // import {GetServerSideProps} from "next"
// // import {setCookie, parseCookies, destroyCookie} from "nookies"
// // import {Rating, Carousel} from "components"
// // import {Average} from "utils/average"
// // import {common} from "@material-ui/core/colors"
// // import {Review} from "@types"
// // import {
// //   Button,
// //   CardContent,
// //   TableCell,
// //   TableRow,
// //   TableContainer,
// //   TableHead,
// //   Table,
// //   TableBody,
// //   Grid,
// //   MenuItem,
// //   Select,
// //   List,
// //   ListItem,
// //   Typography,
// //   Card,
// //   Paper,
// // } from "@material-ui/core"
// // import Image from "next/image"
// // // import {useRouter} from "next/router"
// // import Router from "next/router"

// // import NextLink from "next/link"
// // import {Product} from "@types"
// // import {Circular} from "components/common/Circular"
// // import {makeStyles} from "@material-ui/styles"
// // import theme from "theme"
// // import {WishlistGet, WishlistCreate, WishlistDelete} from "services/api/wishlist"
// // import {useAuth} from "context/AuthContext"
// // import {useRouter} from "next/router"
// // import {User} from "context/AuthContext"

// // const Wishlist = ({props}: any) => {
// //   const useStyles: any = makeStyles(() => ({
// //     numReviews: {
// //       marginLeft: theme.spacing(1),
// //       color: common.black,
// //     },
// //   }))
// //   const [user, setUser] = useState<User | null>(null)
// //   useEffect(() => {
// //     let cookies = parseCookies()
// //     let token = cookies["token"]
// //     if (token) {
// //       api
// //         .get("/auth/me")
// //         .then((user) => {
// //           setUser(user.data.user)
// //         })
// //         .catch((err: any) => {
// //           console.log(err)
// //         })
// //     } else {
// //       Router.replace("/")
// //     }
// //   }, [])
// //   console.log("user", user)
// //   const classes = useStyles()
// //   const {data, error, mutate} = WishlistGet()

// //   const wishlist = !data ? [] : data.data
// //   console.log("wishlist", wishlist)
// //   function removeItemHandler(item: any) {}

// //   // const averageNum = Average(wishlist[0]?.reviews.map((review: Review) => review.rating))
// //   return (
// //     <Layout>
// //       <Paper style={{padding: 30, marginTop: 50}}>
// //         <Typography>Wishlist</Typography>
// //         {wishlist.length === 0 ? (
// //           <div>
// //             Wishlist is empty.{" "}
// //             <NextLink href="/" passHref>
// //               <Link>Go shopping</Link>
// //             </NextLink>
// //           </div>
// //         ) : (
// //           <Grid container spacing={1}>
// //             <Grid item md={12} xs={12}>
// //               <CardContent>
// //                 <TableContainer>
// //                   <Table>
// //                     <TableHead>
// //                       <TableRow>
// //                         <TableCell>Image</TableCell>
// //                         <TableCell>Name</TableCell>
// //                         <TableCell align="center">Category</TableCell>
// //                         <TableCell align="right">Price</TableCell>
// //                         <TableCell align="center">Review</TableCell>
// //                       </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                       {wishlist?.map((item: Product) => (
// //                         <TableRow key={item.id}>
// //                           <TableCell>
// //                             <NextLink href={`/product/${item.slug}`} passHref>
// //                               <Link>
// //                                 <Image
// //                                   src={item.images[0].url}
// //                                   alt={item.product_name}
// //                                   width={50}
// //                                   height={50}
// //                                 ></Image>
// //                               </Link>
// //                             </NextLink>
// //                           </TableCell>
// //                           <TableCell>
// //                             <NextLink href={`/product/${item.slug}`} passHref>
// //                               <Link>
// //                                 <Typography>{item.product_name}</Typography>
// //                               </Link>
// //                             </NextLink>
// //                           </TableCell>
// //                           <TableCell align="center">
// //                             <p>{item.category.category_name}</p>
// //                           </TableCell>
// //                           <TableCell align="right">${item.price}</TableCell>
// //                           <TableCell align="center">
// //                             {item.reviews ? (
// //                               <div style={{display: "flex", justifyContent: "center"}}>
// //                                 <Rating
// //                                   value={Average(
// //                                     item.reviews.map((review: Review) => review.rating)
// //                                   )}
// //                                 />
// //                                 <Typography className={classes.numReviews}>
// //                                   ({item.reviews.length})
// //                                 </Typography>
// //                               </div>
// //                             ) : (
// //                               <Typography className={classes.numReviews}>No reviews yet</Typography>
// //                             )}
// //                           </TableCell>
// //                         </TableRow>
// //                       ))}
// //                     </TableBody>
// //                   </Table>
// //                 </TableContainer>
// //               </CardContent>
// //             </Grid>
// //           </Grid>
// //         )}
// //       </Paper>
// //     </Layout>
// //   )
// // }

// // export default Wishlist
// // export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
// //   const res = await fetch(`${BaseURL}/wishlist`, {
// //     method: "GET",
// //     headers: {"Content-Type": "application/json"},
// //     credentials: "include",
// //   })
// //   const wishlist = await res.json()
// //   return {props: {wishlist}}
// // }
