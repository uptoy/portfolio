import * as React from "react"
import theme from "theme"
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
import { Rating } from "components"
import { mainFeaturedPost } from "utils/seed"
// import { products } from "utils/seed"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import { red, common } from "@material-ui/core/colors"
import Link from "components/Link"
import { useRouter } from "next/router"

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
  favorite: {
    minWidth: 30,
    color: red[500],
    marginRight: theme.spacing(1),
  },
  numReviews: {
    marginLeft: theme.spacing(1),
    color: common.black,
  },
}))

export default function CategoryDetail() {
  const classes = useStyles()
  const router = useRouter()
  const { slug } = router.query
  return (
    <Layout>
      <MainFeaturedPost post={mainFeaturedPost} slug={slug} />
      <Container className={classes.cardGrid} maxWidth="xl">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <Link href={`/product/${product.id}`}>
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
                  <Button size="small" color="primary" className={classes.favorite}>
                    <FavoriteBorderIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

// import * as React from "react"
// import theme from "theme"
// import { MainFeaturedPost } from "components/ProductTop"
// import { Container } from "@material-ui/core"
// import { useRouter } from "next/router"
// import { makeStyles } from "@material-ui/styles"
// import { Layout } from "components/organisms"
// import { mainFeaturedPost } from "utils/seed"
// import { red, common } from "@material-ui/core/colors"

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
//     paddingTop: "80%", // 16:9
//   },
//   cardContent: {
//     flexGrow: 1,
//     paddingTop: theme.spacing(2),
//     paddingBottom: theme.spacing(0.25),
//   },
//   cardActions: {
//     justifyContent: "space-between",
//   },
//   favorite: {
//     minWidth: 30,
//     color: red[500],
//     marginRight: theme.spacing(1),
//   },
//   numReviews: {
//     marginLeft: theme.spacing(1),
//     color: common.black,
//   },
// }))

// export default function CategoryDetail() {
//   const classes = useStyles()
//   const router = useRouter()
//   const { slug } = router.query
//   return (
//     <Layout>
//       <MainFeaturedPost post={mainFeaturedPost} />
//       <Container className={classes.cardGrid} maxWidth="xl">
//         <p>{slug} list</p>
//         <p>{slug}</p>
//         <p>{slug}</p>
//         <p>{slug}</p>
//         <p>{slug}</p>
//         <p>{slug}</p>
//         <p>{slug}</p>
//         <p>{slug}</p>
//         <p>{slug}</p>
//         <p>{slug}</p>
//         <p>{slug}</p>
//         <p>{slug}</p>
//       </Container>
//     </Layout>
//   )
// }
