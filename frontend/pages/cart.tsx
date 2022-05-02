import * as React from "react"
import type {NextPage} from "next"
import Link from "@material-ui/core/Link"
import {Layout} from "components/organisms"
import useSWR from "swr"
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
import {useRouter} from "next/router"
import NextLink from "next/link"
import {Product} from "@types"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import {products} from "utils/seed"
import {GetServerSidePropsContext, GetServerSideProps} from "next"
import {useAuth} from "context/AuthContext"
const BaseURL = "http://localhost:8080/api"

const useStyles: any = makeStyles(() => ({
  checkout: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "10em",
    },
  },
}))

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await fetch(`${BaseURL}/cart`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  })
  const cart = await res.json()
  return {props: {cart}}
}

const Cart: NextPage = ({cart}: any) => {
  const fetcher = (url: any) =>
    fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    }).then((r) => r.json())
  const {data, error, mutate} = useSWR(`${BaseURL}/cart`, fetcher, {
    fallbackData: cart,
    revalidateOnMount: true,
  })
  const router = useRouter()
  // const classes = useStyles()
  const fetchCartItems = data
  console.log("cart", fetchCartItems)
  // const WishlistDelete = async (product: Product) => {
  //   const res = await fetch(`${BaseURL}/wishlist/${product.id}`, {
  //     method: "DELETE",
  //     headers: {"Content-Type": "application/json"},
  //     credentials: "include",
  //   })
  // }
  // const {isAuthenticated} = useAuth()
  // const cartItems = products
  // const updateCartHandler = async (item: Product, quantity: number) => {}

  // const removeItemHandler = (item: Product) => {}

  // const checkoutHandler = () => {
  //   router.push("/checkout")
  // }
  return <Layout>aaa</Layout>
}

export default Cart
