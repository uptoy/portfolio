import type {NextPage} from "next"
import {useEffect} from "react"
import Image from "next/image"
import React from "react"
import theme from "theme"
import {GetServerSidePropsContext, GetServerSideProps} from "next"
import toast from "react-hot-toast"
import {Typography, Grid, Button, List, ListItem} from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import {makeStyles} from "@material-ui/styles"
import {Layout} from "components/organisms"
import {red, common} from "@material-ui/core/colors"
import {CartItem} from "@types"
import {useRouter} from "next/router"
import useSWR from "swr"
import {Link} from "components"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import {Icon} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import {useAuth} from "context/AuthContext"

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
  icon: {
    "&:hover": {
      color: common.black,
    },
    "&:active": {
      color: common.black,
    },
    display: "block",
  },
  grid: {
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
  item: {
    textAlign: "center",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
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
  const {isAuthenticated} = useAuth()
  const router = useRouter()
  const classes = useStyles()
  const fetchCartItems = data.data
  const handleDecrement = async (cartItem: CartItem) => {
    const quantity = cartItem.quantity
    const productId = cartItem.product_id
    try {
      if (quantity == 1) {
        await fetch(`${BaseURL}/cart/${productId}`, {
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
          credentials: "include",
        })
        await mutate({...data, cartItem})
      } else {
        await fetch(`${BaseURL}/cart/dec/${productId}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          credentials: "include",
        })
        await mutate({...data, cartItem})
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
  }
  const handleIncrement = async (cartItem: CartItem) => {
    try {
      const productId = cartItem.product_id
      await fetch(`${BaseURL}/cart/inc/${productId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      })
      await mutate({...data, cartItem})
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
  }
  const handleDelete = async (cartItem: CartItem) => {
    const productId = cartItem.product_id
    try {
      await fetch(`${BaseURL}/cart/${productId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      })
      await mutate({...data, cartItem})
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
  }
  const handleCheckOut = async () => {
    router.push("/checkout")
  }
  const totalNum: number = fetchCartItems?.reduce((total: number, cartItem: CartItem): number => {
    return total + cartItem.quantity
  }, 0)
  const totalPrice: number = fetchCartItems?.reduce((total: number, cartItem: any): number => {
    return total + cartItem.quantity * cartItem.product.price
  }, 0)
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin")
    }
  }, [])
  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            {fetchCartItems?.map((cartItem: CartItem, index: number) => (
              <Paper className={classes.paper} key={index}>
                <Link href={`/product/${cartItem.product_id}`}>
                  <div style={{display: "flex"}}>
                    <Image
                      src={cartItem.product?.images[0].url as string}
                      alt={cartItem.product?.product_name}
                      width={"100%"}
                      height={"100%"}
                    ></Image>
                    <div style={{paddingLeft: 10}}>
                      <p style={{margin: 0}}>name</p>
                      <p>{cartItem.product?.price}</p>
                      <p style={{color: "#007600"}}>In Stock</p>
                    </div>
                  </div>
                </Link>
                <div style={{paddingTop: 10, display: "flex"}}>
                  <Icon color="primary" className={classes.icon}>
                    <RemoveCircleOutlineIcon onClick={() => handleDecrement(cartItem)} />
                  </Icon>
                  <div style={{marginRight: 10, marginLeft: 10}}>{cartItem.quantity}</div>
                  <Icon color="primary" className={classes.icon}>
                    <AddCircleOutlineIcon onClick={() => handleIncrement(cartItem)} />
                  </Icon>
                  <Icon color="inherit" style={{marginLeft: 10}}>
                    <DeleteIcon onClick={() => handleDelete(cartItem)} />
                  </Icon>
                </div>
              </Paper>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md>
            <Paper className={classes.paper}>
              <List>
                <ListItem style={{justifyContent: "center"}}>
                  <Typography variant="h6">SubTotal(${totalPrice})</Typography>
                </ListItem>
                <ListItem style={{justifyContent: "center"}}>
                  <Button
                    variant="contained"
                    className={classes.checkout}
                    color="primary"
                    onClick={() => handleCheckOut()}
                  >
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default Cart
