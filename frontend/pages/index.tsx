import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import toast from "react-hot-toast"
import Link from "next/link"
import React, {useCallback} from "react"
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
import {useAuth} from "context/AuthContext"
import {Review} from "@types"
import {Average} from "utils/average"
import {useRouter} from "next/router"
import {api} from "services/apiClient"
import useSWR from "swr"
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

const Index: NextPage = ({products, wishlist}: any) => {
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
    try {
      await fetch(`${BaseURL}/wishlist/${product.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      })
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
  }
  const WishlistCreate = async (product: Product) => {
    try {
      await fetch(`${BaseURL}/wishlist`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(product),
      })
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
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
            await WishlistCreate(product)
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
                  {product.images == null ? (
                    <CardMedia
                      className={classes.cardMedia}
                      image="http://placehold.jp/150x150.png"
                      title="Image title"
                    />
                  ) : (
                    <CardMedia
                      className={classes.cardMedia}
                      image="http://placehold.jp/150x150.png"
                      title="Image title"
                    />
                  )}
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
        {/* <CarouselContainer /> */}
      </Container>
    </Layout>
  )
}

export default Index

// const CarouselContainer = () => {
//   const {data, error, mutate} = useSWR(`http://localhost:8080/api/products`, fetcher)
//   console.log("data", data)
//   return (
//     <div>
//       <Carousel title="Ralated Product" />
//       <Carousel title="Popular products" />
//     </div>
//   )
// }
