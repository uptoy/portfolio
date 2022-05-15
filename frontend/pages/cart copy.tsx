import type {NextPage} from "next"
import Image from "next/image"
import React from "react"
import theme from "theme"
import {GetServerSidePropsContext, GetServerSideProps} from "next"
import toast from "react-hot-toast"
import {
  Typography,
  Grid,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Card,
  List,
  ListItem,
} from "@material-ui/core"
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
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import {Icon} from "@material-ui/core"
import AddBoxIcon from "@material-ui/icons/AddBox"
import DeleteIcon from "@material-ui/icons/Delete"
import {Rating} from "components"

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
  // return (
  //   <Layout>
  //     <div>
  //       {fetchCartItems?.length === 0 ? (
  //         <div>
  //           Cart is empty.
  //           <Link href="/" passHref>
  //             Go shopping
  //           </Link>
  //         </div>
  //       ) : (
  //         <Grid container spacing={1}>
  //           <Grid item md={9} xs={12}>
  //             <CardContent>
  //               <TableContainer>
  //                 <Table>
  //                   <TableHead>
  //                     <TableRow>
  //                       <TableCell>Image</TableCell>
  //                       <TableCell>Name</TableCell>
  //                       <TableCell align="center">Quantity</TableCell>
  //                       <TableCell align="center">Price</TableCell>
  //                       <TableCell align="center">Action</TableCell>
  //                     </TableRow>
  //                   </TableHead>
  //                   <TableBody>
  //                     {fetchCartItems?.map((cartItem: CartItem, index: number) => (
  //                       <TableRow key={index}>
  //                         <TableCell>
  //                           <Link href={`/product/${cartItem.product_id}`} passHref>
  //                             <Image
  //                               src={cartItem.product.images[0].url}
  //                               alt={cartItem.product.product_name}
  //                               width={50}
  //                               height={50}
  //                             ></Image>
  //                           </Link>
  //                         </TableCell>
  //                         <TableCell>
  //                           <Link href={`/product/${cartItem.product_id}`} passHref>
  //                             <Typography>{cartItem.product.product_name}</Typography>
  //                           </Link>
  //                         </TableCell>
  //                         <TableCell align="center">{cartItem.quantity}</TableCell>
  //                         <TableCell align="center">{cartItem.product.price}</TableCell>
  //                         <TableCell align="center">
  //                           <Icon color="primary" className={classes.icon}>
  //                             <RemoveCircleOutlineIcon onClick={() => handleDecrement(cartItem)} />
  //                           </Icon>
  //                           <Icon color="primary" className={classes.icon}>
  //                             <DeleteIcon onClick={() => handleDelete(cartItem)} />
  //                           </Icon>
  //                           <Icon color="primary" className={classes.icon}>
  //                             <AddCircleOutlineIcon onClick={() => handleIncrement(cartItem)} />
  //                           </Icon>
  //                         </TableCell>
  //                       </TableRow>
  //                     ))}
  //                   </TableBody>
  //                 </Table>
  //               </TableContainer>
  //             </CardContent>
  //           </Grid>
  //           <Grid item md={3} xs={12}>
  //             <Card>
  //               <List>
  //                 <ListItem style={{justifyContent: "center"}}>
  //                   <Typography variant="h6">SubTotal(${totalPrice})</Typography>
  //                 </ListItem>
  //                 <ListItem style={{justifyContent: "center"}}>
  //                   <Button
  //                     variant="contained"
  //                     className={classes.checkout}
  //                     color="primary"
  //                     onClick={() => handleCheckOut()}
  //                   >
  //                     Check Out
  //                   </Button>
  //                 </ListItem>
  //               </List>
  //             </Card>
  //           </Grid>
  //         </Grid>
  //       )}
  //     </div>
  //   </Layout>
  // )
  // return (
  //   <Layout>
  //     <Grid container mt={2} className={classes.grid}>
  //       <Card style={{paddingLeft: 10, paddingTop: 10}}>
  //         <div style={{display: "flex"}}>
  //           <div>
  //             <Image src={"http://placehold.jp/150x150.png"} width={"100%"} height={"100%"}></Image>
  //           </div>
  //           <div style={{paddingLeft: 10}}>
  //             <p style={{marginTop: 0}}>name</p>
  //             <p>price</p>
  //           </div>
  //         </div>
  //         <div style={{padding: 10, display: "flex", justifyContent: "space-around"}}>
  //           <Icon color="primary" className={classes.icon}>
  //             <RemoveCircleOutlineIcon onClick={() => handleDecrement(cartItem)} />
  //           </Icon>
  //           <span>quantity</span>
  //           <Icon color="primary" className={classes.icon}>
  //             <AddCircleOutlineIcon onClick={() => handleIncrement(cartItem)} />
  //           </Icon>
  //           <Icon color="primary" className={classes.icon}>
  //             <HighlightOffIcon onClick={() => handleDelete(cartItem)} />
  //           </Icon>
  //         </div>
  //       </Card>
  //       <Grid item className={classes.item}>
  //         <Card>
  //           <List>
  //             <ListItem style={{justifyContent: "center"}}>
  //               <Typography variant="h6">SubTotal(${totalPrice})</Typography>
  //             </ListItem>
  //             <ListItem style={{justifyContent: "center"}}>
  //               <Button
  //                 variant="contained"
  //                 className={classes.checkout}
  //                 color="primary"
  //                 onClick={() => handleCheckOut()}
  //               >
  //                 Check Out
  //               </Button>
  //             </ListItem>
  //           </List>
  //         </Card>
  //       </Grid>
  //     </Grid>
  //   </Layout>
  // )
  return (
    <Layout>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Paper className={classes.paper}>
              <div style={{display: "flex"}}>
                <Image
                  src={"http://placehold.jp/150x150.png"}
                  width={"100%"}
                  height={"100%"}
                ></Image>
                <div style={{paddingLeft: 10}}>
                  <p style={{margin: 0}}>name</p>
                  <p>price</p>
                  <p style={{color: "#007600"}}>In Stock</p>
                </div>
              </div>
              <div style={{paddingTop: 10, display: "flex"}}>
                <Icon color="primary" className={classes.icon}>
                  <RemoveCircleOutlineIcon onClick={() => handleDecrement(cartItem)} />
                </Icon>
                <div style={{marginRight: 10, marginLeft: 10}}>quantity</div>
                <Icon color="primary" className={classes.icon}>
                  <AddCircleOutlineIcon onClick={() => handleIncrement(cartItem)} />
                </Icon>
                <Icon color="inherit" style={{marginLeft: 10}}>
                  <DeleteIcon onClick={() => handleDelete(cartItem)} />
                </Icon>
              </div>
            </Paper>
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
