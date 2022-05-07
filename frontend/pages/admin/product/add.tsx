// import React, {useState} from "react"
// import SaveIcon from "@material-ui/icons/Save"
// import {Product, Category} from "@types"
// import {AdminLayout} from "components/dashboard"
// import {SubmitHandler, useForm, Controller} from "react-hook-form"
// import {yupResolver} from "@hookform/resolvers/yup"
// import {productFormSchema} from "yup/schema"
// import {ProductType} from "yup/type"
// import toast from "react-hot-toast"
// import useSWR from "swr"
// import ImageUploading, {ImageListType} from "react-images-uploading"
// import AddIcon from "@material-ui/icons/Add"
// import CancelIcon from "@material-ui/icons/Cancel"
// import axios from "axios"
// import {
//   Snackbar,
//   Card,
//   Divider,
//   Button,
//   LinearProgress,
//   MenuItem,
//   Avatar,
//   TextField,
//   FormControlLabel,
//   Typography,
//   Container,
//   Box,
//   Grid,
//   Checkbox,
//   Paper,
//   Select,
//   CircularProgress,
// } from "@material-ui/core"
// import {makeStyles} from "@material-ui/styles"
// import theme from "theme"
// import {common} from "@material-ui/core/colors"
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
// // import {ImageUpload} from "components/imageUpload/ImageUpload"
// import {useRouter} from "next/router"
// import {red} from "@material-ui/core/colors"
// import StoreOutlinedIcon from "@material-ui/icons/StoreOutlined"
// import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"

// const red500 = red["500"]
// const BaseURL = "http://localhost:8080/api"

// const useStyles: any = makeStyles(() => ({
//   upload: {
//     padding: "1em",
//     borderWidth: 2,
//     borderRadius: 5,
//     outline: "none",
//     borderStyle: "dashed",
//     backgroundColor: "#fafafa",
//     color: "black",
//     fontWeight: "bold",
//     fontSize: "1em",
//     width: "100%",
//     minHeight: "15em",
//   },
//   show: {
//     display: "grid",
//     gap: 30,
//     gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))",
//     width: "100%",
//     //     // padding: "1em 0",
//     marginTop: "0.2em",
//   },
//   cancel: {
//     position: "absolute",
//     bottom: "85%",
//     left: "85%",
//     backgroundColor: "white",
//     borderRadius: "50%",
//   },
//   imageItem: {
//     position: "relative",
//     width: "7em",
//     height: "7em",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   form: {
//     width: "100%",
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   navigation: {
//     fontSize: 15,
//     fontWeight: 400,
//     color: common.black,
//     paddingBottom: 15,
//     display: "block",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 500,
//     marginBottom: 20,
//   },
//   paper: {
//     padding: 20,
//     width: "50%",
//     minWidth: "20em",
//     margin: "auto",
//     marginBottom: "10em",
//   },
//   button: {
//     marginTop: 10,
//     marginLeft: 10,
//   },
//   clear: {
//     clear: "both",
//   },
// }))

// export default function ProductAdd() {
//   const fetcher = (url: any) =>
//     fetch(url, {
//       method: "GET",
//       headers: {"Content-Type": "application/json"},
//       credentials: "include",
//     }).then((r) => r.json())
//   const {data, error, mutate} = useSWR(`${BaseURL}/category`, fetcher)
//   const categories: Category[] = data?.data
//   const classes = useStyles()
//   const router = useRouter()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: {errors},
//   } = useForm<ProductType>({
//     resolver: yupResolver(productFormSchema),
//     defaultValues: {
//       category_id: 1,
//     },
//   })
//   const [files, setFiles] = useState<any>("")
//   const [fileSize, setFileSize] = useState(true)
//   const [fileUploadProgress, setFileUploadProgress] = useState(false)
//   const [fileUploadResponse, setFileUploadResponse] = useState(null)

//   const uploadFileHandler = (event: any) => {
//     setFiles(event.target.files)
//   }

//   const onSubmit = async (productData: any) => {
//     const product_name: any = productData.product_name
//     const str: any = productData.product_name
//     const slug = str.replace(/[^0-9a-z]/gi, "")
//     const brand: any = productData.brand
//     const price: any = productData.price
//     const count_in_stock: any = productData.count_in_stock
//     const description: any = productData.description
//     const category_id: any = productData.category_id
//     try {
//       setIsSubmitting(true)
//       const formData: any = new FormData()
//       formData.append("product_name", product_name)
//       formData.append("slug", slug)
//       formData.append("brand", brand)
//       formData.append("price", price)
//       formData.append("count_in_stock", count_in_stock)
//       formData.append("description", description)
//       formData.append("category_id", category_id)
//       for (let i = 0; i < files.length; i++) {
//         if (files[i].size > 1024) {
//           setFileSize(false)
//           setFileUploadProgress(false)
//           setFileUploadResponse(null)
//           return
//         }
//         formData.append(`files`, files[i])
//       }
//       await fetch(`${BaseURL}/products`, {
//         method: "POST",
//         credentials: "include",
//         body: formData,
//       })
//       setIsSubmitting(false)
//       router.push("/admin/products")
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

//   return (
//     <>
//       <AdminLayout>
//         <div className={classes.main}>
//           <Paper className={classes.paper}>
//             <h3 className={classes.title}>Product</h3>
//             <Divider />
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     label="name"
//                     {...register("product_name")}
//                   />
//                   <p>{errors.product_name?.message}</p>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     id="brand"
//                     label="brand"
//                     {...register("brand")}
//                   />
//                   <p>{errors.brand?.message}</p>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     label="price"
//                     {...register("price")}
//                   />
//                   <p style={{color: red500}}>{errors.price?.message}</p>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Controller
//                     name="category_id"
//                     control={control}
//                     render={({field}) => (
//                       <Select {...field} required style={{width: "100%"}}>
//                         {categories?.map((category: Category) => (
//                           <MenuItem key={category.id} value={category.id}>
//                             {category.category_name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     label="count_in_stock"
//                     {...register("count_in_stock")}
//                   />
//                   <p style={{color: red500}}>{errors.count_in_stock?.message}</p>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     label="description"
//                     {...register("description")}
//                   />
//                   <p style={{color: red500}}>{errors.count_in_stock?.message}</p>
//                 </Grid>
//                 <Grid item xs={12} style={{marginTop: "1em"}}>
//                   <input type="file" multiple onChange={uploadFileHandler} />
//                   {!fileSize && <p style={{color: "red"}}>File size exceeded!!</p>}
//                   {fileUploadProgress && <p style={{color: "red"}}>Uploading File(s)</p>}
//                   {fileUploadResponse != null && (
//                     <p style={{color: "green"}}>{fileUploadResponse}</p>
//                   )}
//                 </Grid>
//               </Grid>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "right",
//                   alignItems: "center",
//                   marginTop: 20,
//                 }}
//               >
//                 <Button
//                   type="button"
//                   variant="contained"
//                   color="primary"
//                   className={classes.button}
//                   onClick={() => router.push("/admin/product")}
//                 >
//                   <ArrowBackIosIcon />
//                   <p style={{margin: 5}}>Back</p>
//                 </Button>

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   className={classes.button}
//                   disableElevation
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <CircularProgress size={25} />
//                   ) : (
//                     <div style={{display: "flex", alignItems: "center"}}>
//                       <SaveIcon style={{margin: 5}} />
//                       <p style={{margin: 5}}>Save</p>
//                     </div>
//                   )}
//                 </Button>
//               </div>
//             </form>
//             <div className={classes.clear} />
//           </Paper>
//         </div>
//       </AdminLayout>
//     </>
//   )
// }

import React, {MouseEventHandler} from "react"
import {makeStyles} from "@material-ui/styles"
import {AdminLayout} from "components/dashboard"
import theme from "theme"
import {Button, Fab, Drawer, Grid, TextField} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import {pink} from "@material-ui/core/colors"
import {ProductList} from "components/product"
import {useRouter} from "next/router"

const useStyles: any = makeStyles(() => ({
  topContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  mainContainer: {
    maxWidth: 800,
    margin: "0 auto",
  },
  table: {
    minWidth: 650,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  fab: {
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    marginRight: 20,
    backgroundColor: pink["500"],
  },
  fabSearch: {
    top: "auto",
    right: 100,
    bottom: 20,
    left: "auto",
    position: "fixed",
    marginRight: 20,
    backgroundColor: "lightblue",
  },
  button: {
    minWidth: 40,
    borderRadius: "50%",
    padding: 5,
    marginRight: 10,
  },
  searchButton: {
    marginRight: 20,
  },
  searchField: {
    margin: 10,
  },
  searchDrawer: {
    overflow: "hidden",
    width: 280,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}))

export default function AdminProductList() {
  const classes = useStyles()
  const router = useRouter()
  const [state, setState] = React.useState({
    right: false,
  })
  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setState({...state, [anchor]: open})
  }
  const handleProductAdd = () => {
    router.push("/admin/product/add")
  }
  return (
    <AdminLayout>
      <Fab size="small" color="secondary" className={classes.fab} onClick={handleProductAdd}>
        <AddIcon />
      </Fab>
      <Fab size="small" className={classes.fabSearch} onClick={toggleDrawer("right", true)}>
        <SearchIcon />
      </Fab>
      <ProductList />
      <SearchDrawer state={state} onClose={toggleDrawer("right", false)} />
    </AdminLayout>
  )
}
interface IProps {
  state: {
    right: boolean
  }
  onClose: (e: MouseEventHandler) => void
}

const SearchDrawer = (props: IProps) => {
  const classes = useStyles()
  const {state, onClose} = props
  return (
    <Drawer anchor="right" open={state["right"]} onClose={onClose}>
      <Grid container className={classes.searchDrawer} spacing={1}>
        <Grid item xs={12} className={classes.searchField}>
          <h5>Search</h5>
        </Grid>
        <Grid item xs={12} className={classes.searchField}>
          <TextField
            placeholder="Product Name"
            label="Product Name"
            name="name"
            fullWidth={true}
            value={"name"}
            onChange={() => {}}
          />
        </Grid>
        <Grid item xs={12} className={classes.searchField}>
          <Button
            variant="contained"
            className={classes.searchButton}
            onClick={() => {}}
            color="secondary"
          >
            Search
          </Button>
          <Button
            variant="contained"
            className={classes.searchButton}
            onClick={() => {}}
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  )
}
