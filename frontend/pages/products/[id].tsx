import {Grid} from "@material-ui/core"
import {useForm, Controller} from "react-hook-form"
import TextField from "@material-ui/core/TextField"
import {Button, MenuItem} from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import {useRouter} from "next/router"

function Basic() {
  const router = useRouter()
  const id = router.query.id as string
  console.log("id", id)
  const n = Number(id)
  const {control, handleSubmit} = useForm({
    defaultValues: {
      product_id: 0,
      quantity: 1,
    },
  })
  const onSubmit = (data: any) => {
    console.log("data", data)
  }
  const ids = 1
  return (
    <Grid container>
      <Grid item sm={2} />
      <Grid item sm={8}>
        <form onSubmit={handleSubmit(onSubmit(ids))}>
          <Controller
            control={control}
            name="quantity"
            render={({field}) => (
              <TextField
                {...field}
                label="プルダウンリスト"
                fullWidth
                margin="normal"
                id="select"
                select
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </TextField>
            )}
          />
          <Button variant="contained" color="primary" type="submit">
            次へ
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default Basic
// // import {Grid} from "@material-ui/core"
// import {useForm, Controller} from "react-hook-form"
// import {TextField} from "@material-ui/core"
// // import FormControlLabel from "@material-ui/core/FormControlLabel"

// // function ProductDetail() {
// //   const {control, handleSubmit} = useForm({
// //     defaultValues: {
// //       pullDown: "",
// //     },
// //   })
// //   const onSubmit = (data: any) => {
// //     console.log("data", data)
// //     console.log("control", control)
// //     console.log("handleSubmit", handleSubmit)
// //   }
// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       <Controller
// //         control={control}
// //         name="pullDown"
// //         render={({field}) => (
// //           <TextField
// //             {...field}
// //             label=""
// //             fullWidth
// //             margin="normal"
// //             id="select"
// //             select
// //           >
// //             <MenuItem value={1}>1</MenuItem>
// //             <MenuItem value={2}>2</MenuItem>
// //             <MenuItem value={3}>3</MenuItem>
// //           </TextField>
// //         )}
// //       />
// //       <Button variant="contained" color="primary" type="submit">
// //         次へ
// //       </Button>
// //     </form>
// //   )
// // }
// import React, {useState} from "react"
// import {Grid, List, ListItem, Typography, Card, Button} from "@material-ui/core"
// import {Rating, CarouselThumbs, ProductReview, Carousel} from "components"
// import Layout from "components/organisms/Layout"
// import {useRouter} from "next/router"
// import theme from "theme"
// import {makeStyles} from "@material-ui/styles"
// import {Select, FormControl, MenuItem} from "@material-ui/core"
// import Container from "@material-ui/core/Container"
// import {Circular} from "components/common/Circular"
// import {ProductFindById} from "services/api/product"
// import {CartAddItem} from "services/api/cart"
// import {CartItem, Review} from "@types"
// import {Average} from "utils/average"
// import {Product} from "@types"

// const useStyles: any = makeStyles(() => ({
//   gridContainer: {
//     justifyContent: "space-around",
//   },
//   typography: {
//     padding: theme.spacing(2),
//   },
//   select: {
//     border: "2px solid #14141545",
//   },
//   button: {
//     display: "block",
//     marginTop: theme.spacing(2),
//   },
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     "& > * + *": {
//       marginTop: theme.spacing(1),
//     },
//   },
//   container: {
//     marginTop: theme.spacing(3),
//   },
//   prgressColor: {
//     color: "#fff",
//   },
// }))

// const ProductDetail: React.ReactNode = () => {
//   const router = useRouter()
//   const classes = useStyles()
//   const id = router.query.id as string
//   const {control, handleSubmit} = useForm({
//     defaultValues: {
//       quantity: 1,
//       product_id: Number(id),
//     },
//   })
//   const onSubmit = (data: any) => {
//     console.log("data", data)
//   }
//   // const [qty, setQty] = useState(1)

//   const {data, error} = ProductFindById(id)
//   if (error) return <div>failed to load</div>
//   if (!data) return <Circular />
//   const product = data.data
//   if (!product) {
//     return <div>Product Not Found</div>
//   }

//   const images = data.data.images
//   const reviews = data.data.reviews
//   const countInStock = data.data.count_in_stock

//   const addToCartHandler = async (product_id: number, quantity: number) => {
//     console.log("add product", product_id)
//     console.log("quantity", quantity)
//     // const cartItem: CartItem = {
//     //   product_id: Number(id),
//     //   quantity: qty,
//     // }
//     // CartAddItem(cartItem)
//     // if (countInStock < qty) {
//     //   window.alert("Sorry. Product is out of stock")
//     //   return
//     // }
//     // router.push("/cart")
//   }

//   const averageNum = Average(product.reviews.map((review: Review) => review.rating))

//   return (
//     <Layout>
//       <Container maxWidth="xl" className={classes.container}>
//         <Grid container my={6} className={classes.gridContainer}>
//           <Grid item xs>
//             <CarouselThumbs images={images} />
//           </Grid>
//           <Grid item xs={4}>
//             <List>
//               <ListItem>
//                 <Typography component="h6" variant="h6">
//                   {product.name}
//                 </Typography>
//               </ListItem>
//               <ListItem>
//                 <Rating
//                   value={averageNum}
//                   text={`${product.reviews ? product.reviews.length : 0} reviews`}
//                 />
//               </ListItem>
//               <ListItem>
//                 <Typography>Category: {product.category.category_name}</Typography>
//               </ListItem>
//               <ListItem>
//                 <Typography>Brand: {product.brand}</Typography>
//               </ListItem>
//               <ListItem>
//                 <Typography> Description: {product.description}</Typography>
//               </ListItem>
//             </List>
//           </Grid>
//           <Grid item xs={3}>
//             <Card>
//               <List>
//                 <ListItem>
//                   <Grid container>
//                     <Grid item xs={6}>
//                       <Typography>Price</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography>{product.price}</Typography>
//                     </Grid>
//                   </Grid>
//                 </ListItem>
//                 <ListItem>
//                   <Grid container>
//                     <Grid item xs={6}>
//                       <Typography>Status</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography>{countInStock > 0 ? "In stock" : "Unavailable"}</Typography>
//                     </Grid>
//                   </Grid>
//                 </ListItem>
//                 <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
//                   <ListItem>
//                     <Grid container style={{alignItems: "center"}}>
//                       <Grid item xs={6}>
//                         <Typography>Quantity</Typography>
//                       </Grid>
//                       {countInStock > 0 && (
//                         <Grid item xs={6}>
//                           <Controller
//                             control={control}
//                             name="product_id"
//                             render={({field}) => <div {...field} />}
//                           />
//                           <Controller
//                             control={control}
//                             name="quantity"
//                             render={({field}) => (
//                               <Select {...field} fullWidth displayEmpty>
//                                 <MenuItem value={1}>1</MenuItem>
//                                 <MenuItem value={2}>2</MenuItem>
//                                 <MenuItem value={3}>3</MenuItem>
//                               </Select>
//                             )}
//                           />
//                         </Grid>
//                       )}
//                     </Grid>
//                   </ListItem>

//                   <ListItem>
//                     <Button fullWidth variant="contained" color="primary" type="submit">
//                       Add to cart
//                     </Button>
//                   </ListItem>
//                 </form>

//                 {/* <ListItem>
//                   <Grid container style={{alignItems: "center"}}>
//                     <Grid item xs={6}>
//                       <Typography>Quantity</Typography>
//                     </Grid>
//                     {countInStock > 0 && (
//                       <Grid item xs={6}>
//                         <FormControl>
//                           <Select
//                             value={qty}
//                             onChange={handleChange}
//                             displayEmpty
//                             className={classes.selectEmpty}
//                             inputProps={{"aria-label": "Without label"}}
//                           >
//                             <MenuItem value={1}>1</MenuItem>
//                             <MenuItem value={2}>2</MenuItem>
//                             <MenuItem value={3}>3</MenuItem>
//                           </Select>
//                         </FormControl>
//                       </Grid>
//                     )}
//                   </Grid>
//                 </ListItem>
//                 <ListItem>
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     onClick={() => addToCartHandler(product)}
//                   >
//                     Add to cart
//                   </Button>
//                 </ListItem> */}
//               </List>
//             </Card>
//           </Grid>
//         </Grid>
//         <ProductReview reviews={reviews} />
//         <Carousel title="Ralated Product" />
//         <Carousel title="Popular products" />
//       </Container>
//     </Layout>
//   )
// }

// export default ProductDetail
