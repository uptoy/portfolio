import React, {useState} from "react"
import theme from "theme"
import {Rating, Carousel} from "components"
import {MainFeaturedPost} from "components/productTop"
import useSWR from "swr"
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
import {Product} from "types"
import fetcher from "lib/fetch"
import {useProducts} from "lib/api/product"



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
  const classes = useStyles()
  const [state, setState] = useState(false)
  const handleClick = () => {
    setState(!state)
  }
  const {data, error} = useProducts()
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const products = data.data

  return (
    <>
      <Layout>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Container className={classes.cardGrid} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product: Product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Link href={`/product/${product.id}`}>
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
                      <Rating value={product.reviews[0].rating} />
                      <Typography className={classes.numReviews}>
                        ({product.reviews.length})
                      </Typography>
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
