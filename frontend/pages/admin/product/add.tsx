import React, {useState} from "react"
import SaveIcon from "@material-ui/icons/Save"
import {Product, Category} from "@types"
import {AdminLayout} from "components/dashboard"
import Alert from "@material-ui/lab/Alert"
import {formPageStyles} from "styles"
import Skeleton from "@material-ui/lab/Skeleton"
import {SubmitHandler, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {ProductType} from "yup/type"
import {productFormSchema} from "yup/schema"
import toast from "react-hot-toast"
import {
  Snackbar,
  Card,
  Divider,
  Button,
  LinearProgress,
  MenuItem,
  Avatar,
  TextField,
  FormControlLabel,
  Typography,
  Container,
  Box,
  Grid,
  Checkbox,
  Paper,
  CircularProgress,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Link from "components/Link"
import {makeStyles} from "@material-ui/styles"
import Copyright from "components/Copyright"
import theme from "theme"
import {useRouter} from "next/router"
import {api} from "services/apiClient"
import {useAuth} from "context/AuthContext"
import {common} from "@material-ui/core/colors"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import {ImageUpload} from "components/imageUpload/ImageUpload"
import {categories} from "utils/seed"
// import {ProductAdd} from "services/api/product"

interface SkeletonFormProps {
  withList?: boolean
}

// const SkeletonForm: React.FC<SkeletonFormProps> = ({withList}) => {
//   return (
//     <Grid container>
//       {[1, 2, 3].map((i) =>
//         [1, 2, 3].map((e) => (
//           <Grid item key={e} xs={12} sm={4}>
//             <Skeleton key={e} variant="rect" style={{margin: "1.5em"}} height={50} />
//           </Grid>
//         ))
//       )}
//       {withList && (
//         <React.Fragment>
//           <Grid item xs={12} sm={4}>
//             <Skeleton variant="rect" style={{margin: "1.5em"}} height={20} />
//           </Grid>
//           <Grid item xs={12}>
//             <Skeleton variant="rect" style={{margin: "1.5em"}} height={50} />
//           </Grid>
//         </React.Fragment>
//       )}
//     </Grid>
//   )
// }

// const styles = formPageStyles

interface ProductFormProps {
  product: Product
  categoryList: Category[]
  errorMessage?: string
  isFetching: boolean
  deleted: boolean
  updated: boolean
}

interface ProductFormState {
  product: Product
  snackbarOpen: boolean
  autoHideDuration: number
}

const useStyles: any = makeStyles(() => ({
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  navigation: {
    fontSize: 15,
    fontWeight: 400,
    color: common.black,
    paddingBottom: 15,
    display: "block",
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 20,
  },
  paper: {
    padding: 10,
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
  },
  clear: {
    clear: "both",
  },
}))

const ProductAdd = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {signUp} = useAuth()
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<Product>({
    resolver: yupResolver(productFormSchema),
  })
  const handleProductAdd: SubmitHandler<Product> = async (formData) => {
    try {
      setLoading(true)
      // await signUp(formData)
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
      } else {
        console.log("Unknown Failure", err)
      }
    }
  }
  const categories: Category[] = [
    {
      id: 1,
      category_name: "apple",
    },
    {
      id: 2,
      category_name: "potato",
    },
    {
      id: 3,
      category_name: "tomato",
    },
  ]
  return (
    <AdminLayout>
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <h3 className={classes.title}>Product</h3>
          <Divider />
          <form noValidate onSubmit={handleSubmit(handleProductAdd)} style={{marginTop: "1em"}}>
            <Grid container spacing={3} style={{marginTop: 5}}>
              <Grid item sm={12} md>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Name"
                  {...register("product_name")}
                />
              </Grid>
              <Grid item sm={12} md>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Brand"
                  {...register("brand")}
                />
              </Grid>
              <Grid item sm={12} md>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="price"
                  {...register("price")}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} style={{marginTop: 5}}>
              <Grid item sm={12} md>
                <TextField
                  select
                  fullWidth
                  defaultValue=""
                  label="category"
                  {...register("category_id")}
                >
                  {categories.map((category: Category) => (
                    <MenuItem key={category.id} value={category.category_name}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={12} md>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="stock"
                  {...register("count_in_stock")}
                />
              </Grid>
              <Grid item sm={12} md>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="description"
                  {...register("description")}
                />
              </Grid>
            </Grid>
            <Grid style={{marginTop: "1em"}}>
              <ImageUpload />
            </Grid>
            <div style={{display: "flex", justifyContent: "right", alignItems: "center"}}>
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                <ArrowBackIosIcon />
                <p style={{margin: 5}}>Back</p>
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disableElevation
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={25} />
                ) : (
                  <div style={{display: "flex", alignItems: "center"}}>
                    <SaveIcon style={{margin: 5}} />
                    <p style={{margin: 5}}>Save</p>
                  </div>
                )}
              </Button>
            </div>
          </form>
          <div className={classes.clear} />
        </Paper>
      </div>
    </AdminLayout>
  )
}

export default ProductAdd

// import Button from "@material-ui/core/Button"
// import CircularProgress from "@material-ui/core/CircularProgress"
// import {makeStyles} from "@material-ui/styles"
// import TextField from "@material-ui/core/TextField"
// import {unwrapResult} from "@reduxjs/toolkit"
// import {useState} from "react"
// import {Image} from "types"
// import {useForm, Controller} from "react-hook-form"
// import {ImageUpload} from "components/ImageUpload/ImageUpload"
// import toast from "react-hot-toast"
// import {
//   setSelectedModal,
//   addProduct,
//   setSelectedProduct,
//   updateProduct,
//   fetchProducts,
// } from "features/product/productSlice"

// import TextareaAutosize from "@material-ui/core/TextareaAutosize"

// import {useAppDispatch, useAppSelector} from "app/hooks"
// import Modal from "components/Modal/Modal"

// interface FormData {
//   id: string
//   product_name: string
//   slug: string
//   brand: string
//   price: string
//   category_id: string
//   count_in_stock: string
//   description: string
//   average_rating: string
//   createdAt?: Date | null
//   updatedAt?: Date | null
//   images: Image[]
// }

// const useStyles: any = makeStyles(() => ({
//   input: {
//     margin: "16px 0px",
//   },
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "flex-end",
//     // marginTop: 20,
//   },
//   textarea: {
//     width: "100%",
//     margin: "16px 0px",
//     opacity: "0.7",
//     fontSize: "1em",
//     padding: "16.5px 14px",
//     borderWidth: "1.25px",
//     borderRadius: "5px",
//   },
// }))

// const ProductManageModal = () => {
//   const classes = useStyles()

//   const {selectedProduct, selectedModal} = useAppSelector((state) => state.product)

//   // image number?
//   const defaultValues = {
//     id: selectedProduct?.id.toString() || "",
//     product_name: selectedProduct?.product_name || "",
//     slug: selectedProduct?.slug || "",
//     brand: selectedProduct?.brand || "",
//     price: selectedProduct?.price.toString() || "",
//     category_id: selectedProduct?.category_id.toString() || "",
//     count_in_stock: selectedProduct?.count_in_stock.toString() || "",
//     description: selectedProduct?.description || "",
//     average_rating: selectedProduct?.average_rating.toString() || "",
//     images: selectedProduct?.images || [],
//   }

//   const {handleSubmit, control} = useForm<FormData>({
//     defaultValues,
//   })

//   const dispatch = useAppDispatch()

//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const productManageModalTitle = selectedProduct ? "Edit Product" : "Add New Product"

//   const onSubmit = async (formData: FormData) => {
//     try {
//       setIsSubmitting(true)
//       const fields = {
//         ...formData,
//         id: Number(formData.id),
//         price: Number(formData.price),
//         category_id: Number(formData.category_id),
//         count_in_stock: Number(formData.count_in_stock),
//         average_rating: Number(formData.average_rating),
//       }

//       if (selectedProduct) {
//         const results = await dispatch(updateProduct({id: selectedProduct.id, fields}))
//         unwrapResult(results)
//         toast.success("You have successfully updated  product")
//       } else {
//         const results = await dispatch(addProduct(fields))
//         unwrapResult(results)
//         toast.success("You have successfully added new product")
//       }
//       setIsSubmitting(false)
//     } catch (error) {
//       toast.error(error.message)
//       setIsSubmitting(false)
//     }
//     handleCloseProductModal()
//     dispatch(fetchProducts())
//     dispatch(setSelectedModal(null))
//   }

//   const handleCloseProductModal = () => {
//     dispatch(setSelectedModal(null))
//     dispatch(setSelectedProduct(null))
//   }

//   return (
//     <Modal
//       name={productManageModalTitle}
//       isVisible={selectedModal === "manageProductModal"}
//       onClose={handleCloseProductModal}
//     >
//       <form noValidate onSubmit={handleSubmit(onSubmit)}>
//         <div style={{display: "flex", width: "100%"}}>
//           <div style={{width: "50%"}}>
//             <Controller
//               name="product_name"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "Product Name is required field",
//               }}
//               render={({field: {onChange, value}, fieldState: {error}}) => (
//                 <TextField
//                   className={classes.input}
//                   margin="normal"
//                   onChange={onChange}
//                   value={value}
//                   fullWidth
//                   id="product_name"
//                   label="Product Name"
//                   name="product_name"
//                   error={Boolean(error)}
//                   helperText={error?.message}
//                 />
//               )}
//             />
//             <Controller
//               name="brand"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "Brand is required field",
//               }}
//               render={({field: {onChange, value}, fieldState: {error}}) => (
//                 <TextField
//                   margin="normal"
//                   onChange={onChange}
//                   value={value}
//                   fullWidth
//                   id="brand"
//                   label="brand"
//                   name="brand"
//                   error={Boolean(error)}
//                   helperText={error?.message}
//                 />
//               )}
//             />
//             <Controller
//               name="price"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "Price is required field",
//               }}
//               render={({field: {onChange, value}, fieldState: {error}}) => (
//                 <TextField
//                   margin="normal"
//                   onChange={onChange}
//                   value={value}
//                   fullWidth
//                   id="price"
//                   label="price"
//                   name="price"
//                   error={Boolean(error)}
//                   helperText={error?.message}
//                 />
//               )}
//             />
//             <Controller
//               name="category_id"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "Category is required field",
//               }}
//               render={({field: {onChange, value}, fieldState: {error}}) => (
//                 <TextField
//                   margin="normal"
//                   onChange={onChange}
//                   value={value}
//                   fullWidth
//                   id="category"
//                   label="category"
//                   name="category"
//                   error={Boolean(error)}
//                   helperText={error?.message}
//                 />
//               )}
//             />
//             <Controller
//               name="count_in_stock"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "Stock is required field",
//               }}
//               render={({field: {onChange, value}, fieldState: {error}}) => (
//                 <TextField
//                   margin="normal"
//                   onChange={onChange}
//                   value={value}
//                   fullWidth
//                   id="stock"
//                   label="stock"
//                   name="stock"
//                   error={Boolean(error)}
//                   helperText={error?.message}
//                 />
//               )}
//             />
//           </div>
//           <div style={{width: "50%", marginLeft: "1em"}}>
//             <Controller
//               name="description"
//               control={control}
//               defaultValue=""
//               // rules={{
//               //   required: "Description is required field",
//               // }}
//               render={({field: {onChange, value}}) => (
//                 <TextareaAutosize
//                   id="description"
//                   value={value}
//                   name="description"
//                   aria-label="minimum height"
//                   minRows={5}
//                   placeholder="description"
//                   onChange={onChange}
//                   className={classes.textarea}
//                 />
//               )}
//             />
//             <ImageUpload />
//           </div>
//         </div>
//         <div className={classes.buttonContainer}>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             size="large"
//             disableElevation
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <CircularProgress size={25} /> : "Submit"}
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   )
// }

// export default ProductManageModal
