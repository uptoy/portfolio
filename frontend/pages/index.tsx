import React, { useState } from "react"
import theme from "theme"
import {Rating, Carousel } from "components"
import { MainFeaturedPost } from "components/ProductTop"
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
import { makeStyles } from "@material-ui/styles"
import { Layout } from "components/organisms"
import { mainFeaturedPost } from "utils/seed"
import { products } from "utils/seed"
import { red, common } from "@material-ui/core/colors"
import Link from "components/Link"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"

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

  return (
    <Layout>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Container className={classes.cardGrid} maxWidth="xl">
        {/* End hero unit */}
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
                  {/* <Button size="small" color="primary" className={classes.favorite}>
                    <FavoriteBorderIcon />
                  </Button> */}
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
