import React, {useEffect, useState} from "react"
import type {NextPage} from "next"
import Link from "@material-ui/core/Link"
import {Layout} from "components/organisms"
import {api} from "services/apiClient"
import {GetServerSideProps} from "next"
import {setCookie, parseCookies, destroyCookie} from "nookies"
import {Rating, Carousel} from "components"
import {Average} from "utils/average"
import {common} from "@material-ui/core/colors"
import {Review} from "@types"
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
  const useStyles: any = makeStyles(() => ({
    numReviews: {
      marginLeft: theme.spacing(1),
      color: common.black,
    },
  }))
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
  const classes = useStyles()
  const {data, error, mutate} = WishlistGet()

  const wishlist = !data ? [] : data.data
  console.log("wishlist", wishlist)
  function removeItemHandler(item: any) {}

  // const averageNum = Average(wishlist[0]?.reviews.map((review: Review) => review.rating))
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
            <Grid item md={12} xs={12}>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Review</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {wishlist?.map((item: Product) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.images[0].url}
                                  alt={item.product_name}
                                  width={50}
                                  height={50}
                                ></Image>
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
                            <p>{item.category.category_name}</p>
                          </TableCell>
                          <TableCell align="right">${item.price}</TableCell>
                          <TableCell align="center">
                            <Rating
                              value={Average(item.reviews.map((review: Review) => review.rating))}
                            />
                            <Typography className={classes.numReviews}>
                              ({item.reviews.length})
                            </Typography>
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
    </Layout>
  )
}

export default Wishlist
