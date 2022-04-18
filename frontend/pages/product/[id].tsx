import Link from "next/link"
import useSWR from "swr"

const postsUrl = `https://jsonplaceholder.typicode.com/posts`
const usersUrl = `https://jsonplaceholder.typicode.com/users`
const getPostUrl = (id: any) => `${postsUrl}/${id}`
const getUserUrl = (id: any) => `${usersUrl}/${id}`

const ProductDetail = (post: any, user: any) => (
  <div>
    <Link href="/">
      <a>Back to home</a>
    </Link>
    <h1>
      {post.id} - {post.title}
    </h1>
    <h2>
      <Link href={`/user/[userId]`} as={`/user/${user.userId}`}>
        <a>
          By {user.name} ({user.username})
        </a>
      </Link>
    </h2>
    <p>{user.body}</p>
  </div>
)

ProductDetail.getInitialProps = async (ctx: any) => {
  const {id} = ctx.query
  const postResponse = await fetch(getPostUrl(id))
  const post = await postResponse.json()
  console.info(`post`, post)
  const userResponse = await fetch(getUserUrl(post.userId))
  const user = await userResponse.json()
  return {post, user}
}
export default ProductDetail

// import React, {useState, useEffect} from "react"
// import {Grid, List, ListItem, Typography, Card, Button} from "@material-ui/core"
// import {Link, Rating, CarouselThumbs, ProductReview, Carousel} from "components"
// import Layout from "components/organisms/Layout"
// import {useRouter} from "next/router"
// // import { products } from "utils/seed"
// import {Product} from "types"
// import theme from "theme"
// import {makeStyles} from "@material-ui/styles"
// import {GetServerSideProps} from "next"
// // import {Select, FormControl, MenuItem} from "@material-ui/core"
// // import Container from "@material-ui/core/Container"
// // import {useAppDispatch, useAppSelector} from "app/hooks"
// import {fetchProductById, fetchProducts} from "features/product/productSlice"
// // import {useDispatch, useSelector} from "react-redux"
// // import Image from "next/image"
// import {buildUrl} from "cloudinary-build-url"

// const useStyles: any = makeStyles(() => ({
//   gridContainer: {
//     justifyContent: "space-around",
//   },
//   typography: {
//     padding: theme.spacing(2),
//   },
//   select: {
//     border: "2px solid #14141545",
//   },
//   button: {
//     display: "block",
//     marginTop: theme.spacing(2),
//   },
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     "& > * + *": {
//       marginTop: theme.spacing(1),
//     },
//   },
//   container: {
//     marginTop: theme.spacing(3),
//   },
// }))

// const ProductDetail: React.ReactNode = () => {
//   const classes = useStyles()
//   // const [product] = useState(props.product)
//   // const {product, status, error} = useAppSelector((state) => state.product)
//   // const dispatch = useAppDispatch()
//   // const router = useRouter()
//   // const query = router.query.id
//   // const id = Number(query)
//   // useEffect(() => {
//   //   if (!router.isReady) {
//   //     return
//   //   }
//   //   dispatch(fetchProductById(id))
//   // }, [id])

//   const [qty, setQty] = useState(1)

//   // if (!product) {
//   //   return <div>Product Not Found</div>
//   // }
//   // const images = product.images
//   // console.log(product.images)

//   // const addToCartHandler = async () => {
//   // const existItem = state.cart.cartItems.find((x) => x.id === product.id)
//   // const quantity = existItem ? existItem.quantity + 1 : 1
//   // const {data} = await axios.get(`/api/products/${product.id}`)
//   // if (data.countInStock < quantity) {
//   //   alert("Sorry. Product is out of stock")
//   //   return
//   // }
//   // dispatch({type: "CART_ADD_ITEM", payload: {...product, quantity}})
//   // router.push("/cart")
//   // }
//   // console.log(product)
//   // const handleChange = (event: any) => {
//   //   setQty(event.target.value)
//   // }
//   // const url = buildUrl("galaxy_ne5p8f", {
//   //   cloud: {
//   //     cloudName: "fay",
//   //   },
//   //   transformations: {
//   //     effect: {
//   //       name: "pixelate",
//   //       value: 40,
//   //     },
//   //   },
//   // })
//   return <div>aaaa</div>
//   // return (
//   //   <Layout>
//   //     <Container maxWidth="xl" className={classes.container}>
//   //       <Grid container my={6} className={classes.gridContainer}>
//   //         <Grid item xs>
//   //           {/* {console.log(product.images)} */}
//   //           <CarouselThumbs props={product.images} />
//   //         </Grid>
//   //         {/* Center */}
//   //         <Grid item xs={4}>
//   //           <List>
//   //             <ListItem>
//   //               <Typography component="h6" variant="h6">
//   //                 {product.product_name}
//   //               </Typography>
//   //             </ListItem>
//   //             <ListItem>
//   //               <Rating
//   //                 value={product.average_rating}
//   //                 text={`${product.reviews ? product.reviews.length : 0} reviews`}
//   //               />
//   //             </ListItem>
//   //             <ListItem>
//   //               <Typography>Category: {product.category_id}</Typography>
//   //               {product.images?.map((image) => {
//   //                 <div>
//   //                   {console.log(image.url)}
//   //                   <img src={image.url} alt="aaa" />
//   //                 </div>
//   //               })}
//   //             </ListItem>
//   //             <ListItem>
//   //               <Typography>Brand: {product.brand}</Typography>
//   //               <Image src="https://res.cloudinary.com/yutainoue/image/upload/v1650090880/portfolio/uzgvhdavi9xiyzjzhdxg.png" />
//   //             </ListItem>
//   //             <ListItem>
//   //               <Typography> Description: {product.description}</Typography>
//   //             </ListItem>
//   //           </List>
//   //         </Grid>
//   //         {/* Right */}
//   //         <Grid item xs={3}>
//   //           <Card>
//   //             <List>
//   //               <ListItem>
//   //                 <Grid container>
//   //                   <Grid item xs={6}>
//   //                     <Typography>Price</Typography>
//   //                   </Grid>
//   //                   <Grid item xs={6}>
//   //                     <Typography>{product.price}</Typography>
//   //                   </Grid>
//   //                 </Grid>
//   //               </ListItem>
//   //               <ListItem>
//   //                 <Grid container>
//   //                   <Grid item xs={6}>
//   //                     <Typography>Status</Typography>
//   //                   </Grid>
//   //                   <Grid item xs={6}>
//   //                     <Typography>
//   //                       {product!.count_in_stock > 0 ? "In stock" : "Unavailable"}
//   //                     </Typography>
//   //                   </Grid>
//   //                 </Grid>
//   //               </ListItem>
//   //               <ListItem>
//   //                 <Grid container style={{alignItems: "center"}}>
//   //                   <Grid item xs={6}>
//   //                     <Typography>Quantity</Typography>
//   //                   </Grid>
//   //                   {product!.count_in_stock > 0 && (
//   //                     <Grid item xs={6}>
//   //                       <FormControl>
//   //                         <Select
//   //                           value={qty}
//   //                           onChange={handleChange}
//   //                           displayEmpty
//   //                           className={classes.selectEmpty}
//   //                           inputProps={{"aria-label": "Without label"}}
//   //                         >
//   //                           <MenuItem value={1}>1</MenuItem>
//   //                           <MenuItem value={2}>2</MenuItem>
//   //                           <MenuItem value={3}>3</MenuItem>
//   //                         </Select>
//   //                       </FormControl>
//   //                     </Grid>
//   //                   )}
//   //                 </Grid>
//   //               </ListItem>
//   //               <ListItem>
//   //                 <Link href="/cart">
//   //                   <Button
//   //                     fullWidth
//   //                     variant="contained"
//   //                     color="primary"
//   //                     onClick={addToCartHandler}
//   //                   >
//   //                     Add to cart
//   //                   </Button>
//   //                 </Link>
//   //               </ListItem>
//   //             </List>
//   //           </Card>
//   //         </Grid>
//   //       </Grid>
//   //       {/* <ProductReview product={product} /> */}
//   //       {/* <Carousel title="Ralated Product" />
//   //       <Carousel title="Popular products" /> */}
//   //     </Container>
//   //   </Layout>
//   // )
// }

// export default ProductDetail

// // export const getServerSideProps = async (context: any) => {
// //   const id = context.query
// //   console.log(id)
// //   return id
//   // const product = await fetchProductById(id)
// // }
// // export const getStaticProps = async (params: any) => {
// //   // paramsは記事の`id`を含みます。
// //   // ルートが/posts/1のような時、params.id は1です。
// //   const id = Number(params.id)
// //   // const res = await fetch(`https://.../posts/${params.id}`)
// //   // const id = context.query
// //   const res = await fetchProductById(id)
// //   console.log(res)
// //   // const post = await res.json()

// //   // 記事データをprops経由でページに渡します。
// //   // return {props: {post}}
// // }

// // export async function getServerSideProps({params: {id}:any}) {
// //   const res = await fetchProductById(`product/${id}`)
// //   // server side rendering
// //   return {
// //     props: {product: res.product}, // will be passed to the page component as props
// //   }
// // }

// // export const getServerSideProps = async (context: any) => {
// //   //   const { params } = context
// //   //   const { slug } = params
// //   //   await db.connect()
// //   //   const product = await Product.findOne({ slug }).lean()
// //   //   await db.disconnect()
// //   //   return {
// //   //     props: {
// //   //       product: db.convertDocToObj(product),
// //   //     },
// //   //   }
// //   const res = await fetch("https://example.com/profile")
// //   const post = await res.json()
// //   console.log(post)
// //   // 記事データをprops経由でページに渡します。
// //   return {props: {post}}
// // }

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {postId: "1"},
      },
      {
        params: {postId: "1"},
      },
      {
        params: {postId: "1"},
      },
    ],
    fallback: false,
  }
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await res.json
  console.log(data)
  return {
    props: {
      posts: data,
    },
  }
}
