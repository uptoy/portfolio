import React, {useState} from "react"
import type {NextPage} from "next"
import Link from "@material-ui/core/Link"
import {Layout} from "components/organisms"
import {
  Button,
  CardContent,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  Typography,
  Paper
} from "@material-ui/core"
import Image from "next/image"
import {useRouter} from "next/router"
import NextLink from "next/link"
import {Product} from "types"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import {products} from "utils/seed"

const useStyles: any = makeStyles(() => ({
  checkout: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "10em",
    },
  },
}))

const Favorite: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const [state, setState] = useState(false)
  const addCartItemHandler = () => {
    setState(!state)
  }
  const cartItems = products
  const updateCartHandler = async (item: IProduct, quantity: number) => {}

  const removeItemHandler = (item: IProduct) => {}

  const checkoutHandler = () => {
    router.push("/checkout")
  }
  return (
    <Layout>
      <Paper style={{padding: 30, marginTop: 50}}>
        <Typography>favorite</Typography>
        {cartItems.length === 0 ? (
          <div>
            wishList is empty.{" "}
            <NextLink href="/" passHref>
              <Link>Go shopping</Link>
            </NextLink>
          </div>
        ) : (
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="center">
                        <div style={{display: "flex", justifyContent: "center"}}>
                          {state ? (
                            <Button
                              variant="contained"
                              color="info"
                              href="/checkout"
                              style={{margin: 15, display: "block"}}
                            >
                              <Typography>Proceed to</Typography>
                              <Typography>Checkout</Typography>
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="info"
                              style={{margin: 15, padding: 18}}
                              onClick={addCartItemHandler}
                            >
                              Add to Cart
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeItemHandler(item)}
                            style={{margin: 15}}
                          >
                            x
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}
      </Paper>
    </Layout>
  )
}

export default Favorite
