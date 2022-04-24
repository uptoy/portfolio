import React, {useState, useEffect} from "react"
import theme from "theme"
import {Rating, Carousel} from "components"
import {MainFeaturedPost} from "components/productTop"
import {GetServerSideProps} from "next"
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
import Link from "components/Link"
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await api.get("/products").then((res) => res.data.data)
  return {props: {products}}
}

export default function Index({products}: any) {
  const {isAuthenticated} = useAuth()
  const classes = useStyles()
  console.log("products", products)
  const router = useRouter()
  const {data, error, mutate} = WishlistGet()
  console.log("data", data?.data)
  // const wishlist = data === undefined ?? []
  // console.log("wishlist", wishlist)
  const wishlist = !data ? [] : data.data
  console.log("wishlist", wishlist)

  //auth時ok
  // console.log("isAuthenticated", isAuthenticated)
  // if (!data) isAuthenticated ?? <div>loading...</div>
  // console.log("data", data?.data)

  // if (error) return <div>failed to load</div>
  // console.log("data", data)
  // console.log("wishlist", data?.data)
  // const wishlist = data?.data
  const wishlistIsList = wishlist?.map((p: any) => p.id)
  console.log("wishlistIsList", wishlistIsList)

  console.log("isAuthenticated", isAuthenticated)
  const handleClick = (product: Product) => {
    console.log("isAuthenticated", isAuthenticated)
    const wishlistHandler = async () => {
      console.log("product", product)
      if (wishlistIsList?.includes(product.id) == true) {
        await WishlistDelete(String(product.id)).then((res) => {
          console.log("delete res", res.data.data)
          mutate(res.data)
        })
      } else {
        await WishlistCreate(product).then((res) => {
          console.log("create res", res.data.data)
          mutate(res.data)
        })
      }
    }
    isAuthenticated ? wishlistHandler() : router.push("/auth/signup")
  }
  const averageNum = Average(products[0]?.reviews.map((review: Review) => review.rating))
  return (
    <>
      <Layout>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Container className={classes.cardGrid} maxWidth="xl">
          <Grid container spacing={4}>
            {products?.map((product: Product) => (
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
                    <Typography>{product.product_name}</Typography>
                    <Typography>
                      {"$ "}
                      {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary">
                      <Rating value={averageNum} />
                      <Typography className={classes.numReviews}>
                        ({product.reviews.length})
                      </Typography>
                    </Button>
                    <div onClick={() => handleClick(product)}>
                      {wishlistIsList?.includes(product.id) ? (
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
    </>
  )
}

// {data && (
//   <div>
//     {data.data.map((d: any) => {
//       <div>{d.id}</div>
//       console.log("d",d.id)
//     })}
//   </div>
// )}
{
  /* <MainFeaturedPost post={mainFeaturedPost} />
<Container className={classes.cardGrid} maxWidth="xl">
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
}

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
