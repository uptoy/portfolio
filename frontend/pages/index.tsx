import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import React, {SyntheticEvent, useState, useEffect, useCallback} from "react"
import theme from "theme"
import {Rating, Carousel} from "components"
import {MainFeaturedPost} from "components/productTop"
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
} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {Layout} from "components/organisms"
import {mainFeaturedPost} from "utils/seed"
import {red, common} from "@material-ui/core/colors"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import {Product} from "@types"
import {Products} from "services/api/product"
import {WishlistGet, WishlistCreate, WishlistDelete} from "services/api/wishlist"
import {useAuth} from "context/AuthContext"
import {Review} from "@types"
import {Average} from "utils/average"
import {useRouter} from "next/router"
import {api} from "services/apiClient"
import useSWR from "swr"
import {fetcher} from "services/fetcher"
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

const Index = ({products, wishlist}: any) => {
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

  console.log("data", data.data)

  // const sample = async () => {
  //   const res1 = await fetch(`${BaseURL}/wishlist`, {
  //     method: "GET",
  //     headers: {"Content-Type": "application/json"},
  //     credentials: "include",
  //   })
  //   const wishlist = await res1.json()
  //   return wishlist
  // }
  // const aaa = sample()
  // console.log(aaa)

  const router = useRouter()
  const classes = useStyles()
  const fetchProducts = products.data
  const fetchWishlist = data.data

  // console.log("data", data)
  //   const {data, error} = useSwr(key, fetcher, {
  //     initialData: props.dataFromServerSideProps
  // })
  console.log("fetchProducts", fetchProducts)
  console.log("fetchWishlist", fetchWishlist)
  const WishlistDelete = () => {}
  const {isAuthenticated} = useAuth()
  const wishlistIdList = fetchWishlist?.map((p: any) => p.id)
  const handleClick = useCallback(
    (product: Product) => {
      ;(() => {
        const wishlistHandler = async () => {
          if (wishlistIdList?.includes(product.id) == true) {
            // await WishlistDelete(String(product.id)).then((res: any) => {})
            const res1 = await fetch(`${BaseURL}/wishlist/${product.id}`, {
              method: "DELETE",
              headers: {"Content-Type": "application/json"},
              credentials: "include",
            })
          } else {
            // await WishlistCreate(product).then((res: any) => {})
            const res1 = await fetch(`${BaseURL}/wishlist`, {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              credentials: "include",
              body: JSON.stringify(product),
            })
            console.log("res1", res1)
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
      <MainFeaturedPost post={mainFeaturedPost} />
      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={4}>
          {fetchProducts.map((product: any) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <Link href={`/products/${String(product.id)}`}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={product.images[0].url}
                    title="Image title"
                  />
                </Link>
                <CardContent className={classes.cardContent}>
                  <Typography>{product.name}</Typography>
                  <Typography>
                    {"$ "}
                    {product.price}
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size="small" color="primary">
                    <Rating
                      value={Average(product.reviews.map((review: Review) => review.rating))}
                    />
                    <Typography className={classes.numReviews}>
                      ({product.reviews.length})
                    </Typography>
                  </Button>
                  <div onClick={() => handleClick(product)}>
                    {wishlistIdList?.includes(product.id) ? (
                      <FavoriteIcon className={classes.favorite} />
                    ) : (
                      <FavoriteBorderIcon className={classes.favorite} />
                    )}
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Carousel title="Ralated Product" />
        <Carousel title="Popular products" />
      </Container>
    </Layout>
  )
}

export default Index

//   return (
//     <>
//       <Layout>
//         <MainFeaturedPost post={mainFeaturedPost} />
//         <Container className={classes.cardGrid} maxWidth="xl">
//           <Grid container spacing={4}>
//             {fetchProducts?.map((product: Product) => (
//               <Grid item key={product.id} xs={12} sm={6} md={4}>
//                 <Card className={classes.card}>
//                   <Link href={`/products/${String(product.id)}`}>
//                     <CardMedia
//                       className={classes.cardMedia}
//                       image={product.images[0].url}
//                       title="Image title"
//                     />
//                   </Link>
//                   <CardContent className={classes.cardContent}>
//                     <Typography>{product.product_name}</Typography>
//                     <Typography>
//                       {"$ "}
//                       {product.price}
//                     </Typography>
//                   </CardContent>
//                   <CardActions className={classes.cardActions}>
//                     <Button size="small" color="primary">
//                       <Rating
//                         value={Average(product.reviews.map((review: Review) => review.rating))}
//                       />
//                       <Typography className={classes.numReviews}>
//                         ({product.reviews.length})
//                       </Typography>
//                     </Button>
//                     <div onClick={() => handleClick(product)}>
//                       {wishlistIdList?.includes(product.id) ? (
//                         <FavoriteIcon className={classes.favorite} />
//                       ) : (
//                         <FavoriteBorderIcon className={classes.favorite} />
//                       )}
//                     </div>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           <Carousel title="Ralated Product" />
//           <Carousel title="Popular products" />
//         </Container>
//       </Layout>
//     </>
//   )
// }

// {data && (
//   <div>
//     {data.data.map((d: any) => {
//       <div>{d.id}</div>
//       console.log("d",d.id)
//     })}
//   </div>
// )}
// {
//   /* <MainFeaturedPost post={mainFeaturedPost} />
/* <Container className={classes.cardGrid} maxWidth="xl">
  <Grid container spacing={4}>
    {products.map((product) => (
      <Grid item key={product._id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <Link href={`/product/${product._id}`}>
            <CardMedia
              className={classes.cardMedia}
              image="https://source.unsplash.com/random"
              title="Image title"
            />
          </Link>
          <CardContent className={classes.cardContent}>
            <Typography>{product.name}</Typography>
            <Typography>
              {"$ "}
              {product.price}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary">
              <Rating value={product.rating} />
              <Typography className={classes.numReviews}>({product.numReviews})</Typography>
            </Button>
            <div onClick={handleClick}>
              {state ? (
                <FavoriteIcon className={classes.favorite} />
              ) : (
                <FavoriteBorderIcon className={classes.favorite} />
              )}
            </div>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
  <Carousel title="Ralated Product" />
  <Carousel title="Popular products" />
</Container> */

// const [state, setState] = useState(wishlist?.data)
// const [wishlist, setWishlist] = useState(wishlist)

//wishlist ids
// console.log("wishlist", wishlist)
// const ids = wishlist?.map((p: any) => p.id)
// console.log("ids", ids)
// console.log("wishlist", wishlist)
// const wishlist = wishlist.data
// console.log("wishlist", wishlist)
// if (error1) {
//   const router = useRouter()
//   router.push("/")
// }
// console.log("wishlist", wishlist)
// console.log(ids.includes(product.id))

// console.log("products", products)
//user
// const averageNum = Average(products[0]?.reviews.map((review: Review) => review.rating))
//wishlist

// const Home = () => {
//   const [data, setData] = useState<any>(null)

//   useEffect(() => {
//     const fetchPost = async () => {
//       const response = await fetch("http://localhost:8080/api/auth/me", {
//         method: "GET",
//         headers: {"Content-Type": "application/json"},
//         credentials: "include",
//       })
//       const posts = await response.json()
//       console.log("posts", posts)
//       setData(posts)
//     }
//     fetchPost()
//   }, [])
//   const logoutHandler = async (e: SyntheticEvent) => {
//     e.preventDefault()
//     await fetch("http://localhost:8080/api/auth/logout", {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       credentials: "include",
//     })
//   }
