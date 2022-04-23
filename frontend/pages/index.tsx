import React, {useState} from "react"
import theme from "theme"
import {Rating, Carousel} from "components"
import {MainFeaturedPost} from "components/productTop"
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
import {WishlistGet, WishlistCreate} from "services/api/wishlist"
import {useAuth} from "context/AuthContext"
import {Review} from "@types"
import {Average} from "utils/average"
import {useRouter} from "next/router"

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
    paddingTop: "80%", // 16:9
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

export default function Index() {
  const {user} = useAuth()
  const classes = useStyles()

  //products
  const {data, error} = Products()
  const {data: data1, error: error1} = WishlistGet()
  const [state, setState] = useState(data1.data)
  // const [wishlist, setWishlist] = useState(data1)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  console.log(data1.data)
  console.log("state", state)
  const ids = state.map((p: any) => p.id)
  console.log("ids", ids)
  // const numbers = [1, 2, 3, 4, 5]
  // const doubled = data1.map((number) => console.log(number))
  // console.log(doubled)
  // console.log("wishlist", wishlist)
  // const wishlist = data1.data
  // console.log("data1", data1)
  // if (error1) {
  //   const router = useRouter()
  //   router.push("/")
  // }
  // console.log("wishlist", wishlist)
  // console.log(ids.includes(product.id))

  const products = data.data
  //user
  const averageNum = Average(products[0].reviews.map((review: Review) => review.rating))
  //wishlist
  const handleClick = (product: Product) => {
    console.log("product", product)
    const result = WishlistCreate(product)
    result.then((res) => {
      const fetchData = res.data.data
      console.log("fetchData", fetchData)
      setState(fetchData)
    })
    // setState(!state)
  }
  return (
    <>
      <Layout>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Container className={classes.cardGrid} maxWidth="xl">
          <Grid container spacing={4}>
            {products.map((product: Product) => (
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
                      {}
                      {/* {if (wishlist.find((w: any) => w.id == product.id) {

                      }} */}
                      {ids.includes(product.id) ? (
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
      {/* <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            {product.id}
            {product.product_name}
            {product.images.map((image: any) => (
              <div>
                <div>{image.id}</div>
                <div>{image.url}</div>
                <Image src={image.url} width={100} height={100} />
              </div>
            ))}
          </li>
        ))}
      </ul> */}
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
