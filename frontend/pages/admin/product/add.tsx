import React, {useState} from "react"
import SaveIcon from "@material-ui/icons/Save"
import {Product, Category} from "@types"
import {AdminLayout} from "components/dashboard"
import {SubmitHandler, useForm, Controller} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {productFormSchema} from "yup/schema"
import {ProductType} from "yup/type"
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
  Select,
  CircularProgress,
} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import {common} from "@material-ui/core/colors"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import {ImageUpload} from "components/imageUpload/ImageUpload"
import {useRouter} from "next/router"
import {SignUpCredentials} from "yup/type"
import {signUpFormSchema} from "yup/schema"
const BaseURL = "http://localhost:8080/api"
//   const classes = useStyles()
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const {register, handleSubmit} = useForm<Product>({
//     resolver: yupResolver(productFormSchema),
//   })
//   const handleProductAdd: SubmitHandler<Product> = async (formData) => {
//     try {
//       setIsSubmitting(true)
//       console.log("formData", formData)

//       setIsSubmitting(false)
//     } catch (err) {
//       if (err instanceof Error) {
//         toast.error(err.message)
//         console.log("Failed", err.message)
//         throw new Error(err.message)
//       } else {
//         console.log("Unknown Failure", err)
//         throw new Error("Unknown Failure")
//       }
//     }
//   }
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

const useStyles: any = makeStyles(() => ({
  form: {
    width: "100%",
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
    padding: 20,
    width: "50%",
    minWidth: "20em",
    margin: "auto",
    marginBottom: "10em",
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
  },
  clear: {
    clear: "both",
  },
}))

export default function ProductAdd() {
  const classes = useStyles()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    formState: {errors},
    handleSubmit,
    control,
  } = useForm<ProductType>({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      category_id: 1,
    },
  })
  const handleSignUp: SubmitHandler<ProductType> = async (formData) => {
    try {
      setIsSubmitting(true)
      console.log("formData", formData)
      // await fetch(`${BaseURL}/products`, {
      //   method: "POST",
      //   headers: {"Content-Type": "application/json"},
      //   credentials: "include",
      //   body: JSON.stringify(formData),
      // })
      // await signUp(formData)
      setIsSubmitting(false)
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log("Failed", err.message)
        throw new Error(err.message)
      } else {
        console.log("Unknown Failure", err)
        throw new Error("Unknown Failure")
      }
    }
  }

  return (
    <AdminLayout>
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <h3 className={classes.title}>Product</h3>
          <Divider />
          <form noValidate onSubmit={handleSubmit(handleSignUp)} style={{marginTop: "1em"}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="name"
                  {...register("product_name")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="brand"
                  label="brand"
                  {...register("brand")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="price"
                  {...register("price")}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="category_id"
                  control={control}
                  render={({field}) => (
                    <TextField {...field} select sx={{mt: 2}} required style={{width: "100%"}}>
                      {categories.map((category: Category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} style={{marginTop: "1em"}}>
                <ImageUpload />
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => router.push("/admin/product")}
              >
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

// {countInStock > 0 && (
//   <Grid item xs={6}>
//     <Controller
//       name="quantity"
//       control={control}
//       render={({field}) => (
//         <TextField {...field} select sx={{mt: 2}} required>
//           <MenuItem value={1}>1</MenuItem>
//           <MenuItem value={2}>2</MenuItem>
//           <MenuItem value={3}>3</MenuItem>
//         </TextField>
//       )}
//     />
//   </Grid>
// )}

// const ProductAdd = () => {

//   return (
//     <AdminLayout>
//       <div className={classes.main}>
//         <Paper className={classes.paper}>
//           <h3 className={classes.title}>Product</h3>
//           <Divider />
//           <form noValidate onSubmit={handleSubmit(handleProductAdd)} style={{marginTop: "1em"}}>
//             <Grid container spacing={3} style={{marginTop: 5, width: "100%", marginLeft: 0}}>
//               <Grid item sm={12} style={{width: "100%", paddingLeft: 0}}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   label="Name"
//                   {...register("product_name")}
//                 />
//               </Grid>
//               <Grid item sm={12} style={{width: "100%", paddingLeft: 0}}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   label="Brand"
//                   {...register("brand")}
//                 />
//               </Grid>
//               <Grid item sm={12} style={{width: "100%", paddingLeft: 0}}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   label="price"
//                   {...register("price")}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={3} style={{marginTop: 5}}>
//               <Grid item sm={12} style={{width: "100%"}}>
//                 <TextField
//                   select
//                   fullWidth
//                   defaultValue=""
//                   label="category"
//                   {...register("category_id")}
//                 >
//                   {categories.map((category: Category) => (
//                     <MenuItem key={category.id} value={category.category_name}>
//                       {category.category_name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item sm={12} style={{width: "100%"}}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   label="stock"
//                   {...register("count_in_stock")}
//                 />
//               </Grid>
//               <Grid item sm={12} style={{width: "100%"}}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   label="description"
//                   {...register("description")}
//                 />
//               </Grid>
//             </Grid>
//             <Grid style={{marginTop: "1em"}}>
//               <ImageUpload />
//             </Grid>
//         </Paper>
//       </div>
//     </AdminLayout>
//   )
// }

// export default ProductAdd
