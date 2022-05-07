import React, {useState} from "react"
import SaveIcon from "@material-ui/icons/Save"
import {Product, Category} from "@types"
import {AdminLayout} from "components/dashboard"
import {SubmitHandler, useForm, Controller} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {productFormSchema} from "yup/schema"
import {ProductType} from "yup/type"
import toast from "react-hot-toast"
import useSWR from "swr"
import ImageUploading, {ImageListType} from "react-images-uploading"
import AddIcon from "@material-ui/icons/Add"
import CancelIcon from "@material-ui/icons/Cancel"
import axios from "axios"
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
// import {ImageUpload} from "components/imageUpload/ImageUpload"
import {useRouter} from "next/router"
import {red} from "@material-ui/core/colors"
import StoreOutlinedIcon from "@material-ui/icons/StoreOutlined"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"

const red500 = red["500"]
const BaseURL = "http://localhost:8080/api"

const useStyles: any = makeStyles(() => ({
  upload: {
    padding: "1em",
    borderWidth: 2,
    borderRadius: 5,
    outline: "none",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "black",
    fontWeight: "bold",
    fontSize: "1em",
    width: "100%",
    minHeight: "15em",
  },
  show: {
    display: "grid",
    gap: 30,
    gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))",
    width: "100%",
    //     // padding: "1em 0",
    marginTop: "0.2em",
  },
  cancel: {
    position: "absolute",
    bottom: "85%",
    left: "85%",
    backgroundColor: "white",
    borderRadius: "50%",
  },
  imageItem: {
    position: "relative",
    width: "7em",
    height: "7em",
  },
  image: {
    width: "100%",
    height: "100%",
  },
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
  const fetcher = (url: any) =>
    fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    }).then((r) => r.json())
  const {data, error, mutate} = useSWR(`${BaseURL}/category`, fetcher)
  const categories: Category[] = data?.data
  const classes = useStyles()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: {errors},
  } = useForm()
  // const {
  //   register,
  //   formState: {errors},
  //   handleSubmit,
  //   control,
  // } = useForm<ProductType>({
  //   resolver: yupResolver(productFormSchema),
  //   defaultValues: {
  //     category_id: 1,
  //   },
  // })
  const [files, setFiles] = useState<any>("")
  const [fileSize, setFileSize] = useState(true)
  const [fileUploadProgress, setFileUploadProgress] = useState(false)
  const [fileUploadResponse, setFileUploadResponse] = useState(null)
  const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8282"

  const uploadFileHandler = (event: any) => {
    setFiles(event.target.files)
  }

  const onSubmit = async (productData: any) => {
    console.log(productData)
    try {
      const product_name: any = productData.product_name
      const str: any = productData.product_name
      const slug = str.replace(/[^0-9a-z]/gi, "")
      const brand: any = productData.brand
      const price: any = productData.price
      const count_in_stock: any = productData.count_in_stock
      const description: any = productData.description
      const category_id: any = productData.category_id
      console.log("productData", productData)
      setIsSubmitting(true)
      const formData = new FormData()
      formData.append("product_name", product_name)
      formData.append("slug", slug)
      formData.append("brand", brand)
      formData.append("price", price)
      formData.append("count_in_stock", count_in_stock)
      formData.append("description", description)
      formData.append("category_id", category_id)
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 1024) {
          setFileSize(false)
          setFileUploadProgress(false)
          setFileUploadResponse(null)
          return
        }

        formData.append(`files`, files[i])
      }
      //     // await axios.post(`${BaseURL}/products`, formData)
      await fetch(`${BaseURL}/products`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
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
    <>
      <AdminLayout>
        <div className={classes.main}>
          <Paper className={classes.paper}>
            <h3 className={classes.title}>Product</h3>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="name"
                    {...register("product_name")}
                  />
                  <p>{errors.product_name?.message}</p>
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
                  <p>{errors.brand?.message}</p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="price"
                    {...register("price")}
                  />
                  <p style={{color: red500}}>{errors.price?.message}</p>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="category_id"
                    control={control}
                    render={({field}) => (
                      <Select {...field} required style={{width: "100%"}}>
                        {categories?.map((category: Category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.category_name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="count_in_stock"
                    {...register("count_in_stock")}
                  />
                  <p style={{color: red500}}>{errors.count_in_stock?.message}</p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="description"
                    {...register("description")}
                  />
                  <p style={{color: red500}}>{errors.count_in_stock?.message}</p>
                </Grid>
                <Grid item xs={12} style={{marginTop: "1em"}}>
                  <input type="file" multiple onChange={uploadFileHandler} />
                  {!fileSize && <p style={{color: "red"}}>File size exceeded!!</p>}
                  {fileUploadProgress && <p style={{color: "red"}}>Uploading File(s)</p>}
                  {fileUploadResponse != null && (
                    <p style={{color: "green"}}>{fileUploadResponse}</p>
                  )}
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
    </>
  )
}

// const handleProductAdd: SubmitHandler<ProductType> = async (productData) => {
//   try {
//     const product_name: any = productData.product_name
//     const str: any = productData.product_name
//     const slug = str.replace(/[^0-9a-z]/gi, "")
//     const brand: any = productData.brand
//     const price: any = productData.price
//     const count_in_stock: any = productData.count_in_stock
//     const description: any = productData.description
//     const category_id: any = productData.category_id
//     console.log("productData", productData)
//     setIsSubmitting(true)
//     const formData = new FormData()
//     formData.append("product_name", product_name)
//     formData.append("slug", slug)
//     formData.append("brand", brand)
//     formData.append("price", price)
//     formData.append("count_in_stock", count_in_stock)
//     formData.append("description", description)
//     formData.append("category_id", category_id)
//     for (let i = 0; i < files.length; i++) {
//       if (files[i].size > 1024) {
//         setFileSize(false)
//         setFileUploadProgress(false)
//         setFileUploadResponse(null)
//         return
//       }

//       formData.append(`files`, files[i])
//     }
//     // await axios.post(`${BaseURL}/products`, formData)
//     await fetch(`${BaseURL}/products`, {
//       method: "POST",
//       // headers: {"Content-Type": "application/json"},
//       // headers: {"Content-Type": "multipart/form-data"},
//       credentials: "include",
//       body: formData,
//     })
//     setIsSubmitting(false)
//   } catch (err) {
//     if (err instanceof Error) {
//       toast.error(err.message)
//       console.log("Failed", err.message)
//       throw new Error(err.message)
//     } else {
//       console.log("Unknown Failure", err)
//       throw new Error("Unknown Failure")
//     }
//   }
// }

// const fileSubmitHandler = () => {
//   setFileSize(true)
//   setFileUploadProgress(true)
//   setFileUploadResponse(null)
//   console.log("files", files)

//   const formData = new FormData()

//   for (let i = 0; i < files.length; i++) {
//     if (files[i].size > 1024) {
//       setFileSize(false)
//       setFileUploadProgress(false)
//       setFileUploadResponse(null)
//       return
//     }

//     formData.append(`files`, files[i])
//   }

//   const requestOptions = {
//     method: "POST",
//     body: formData,
//   }
//   fetch("http://localhost:8080/api" + "/upload", requestOptions)
//     .then(async (response) => {
//       const isJson = response.headers.get("content-type")?.includes("application/json")
//       const data = isJson && (await response.json())

//       // check for error response
//       if (!response.ok) {
//         // get error message
//         const error = (data && data.message) || response.status
//         setFileUploadResponse(data.message)
//         return Promise.reject(error)
//       }

//       console.log(data.message)
//       setFileUploadResponse(data.message)
//     })
//     .catch((error) => {
//       console.error("Error while uploading file!", error)
//     })
//   setFileUploadProgress(false)
// }

// export default function ProductAdd() {
//   const [images, setImages] = React.useState([])
//   const maxNumber = 5
//   //alert

//   const onChange = async (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
//     setImages(imageList as never[])
//     const newImageArr = Array.from(imageList).filter((_f, i) => addUpdateIndex?.includes(i))
//     const formData = new FormData()
//     newImageArr.forEach((file: any) => formData.append("file", file))
//     console.log(newImageArr)
//     try {
//       await fetch(`${BaseURL}/products`, {
//         method: "POST",
//         headers: {"content-type": "multipart/form-data"},
//         credentials: "include",
//         body: JSON.stringify(formData),
//       })
//     } catch (e) {
//       console.log(e)
//     }
//   }
//   const onErrorImageUploading: any = (
//     errors: {
//       maxFileSize?: boolean
//       maxNumber?: boolean
//       acceptType?: boolean
//       resolution?: boolean
//     },
//     _files: ImageListType
//   ) => {
//     if (errors.acceptType) alert("Register PNG・JPG・GIF Only")
//     if (errors.maxFileSize) alert("Register ◯MB low")
//     if (errors.maxNumber) alert("Register Max 5")
//   }
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
//     formState: {errors},
//     handleSubmit,
//     control,
//   } = useForm<ProductType>({
//     resolver: yupResolver(productFormSchema),
//     defaultValues: {
//       category_id: 1,
//     },
//   })
//   const handleProductAdd: SubmitHandler<ProductType> = async (formData) => {
//     try {
//       const slug: any = formData.product_name
//       const str = slug.replace(/[^0-9a-z]/gi, "")
//       formData.slug = str
//       console.log(formData)
//       // setIsSubmitting(true)
//       // console.log("formData", formData)
//       // // await fetch(`${BaseURL}/products`, {
//       // //   method: "POST",
//       // //   headers: {"Content-Type": "application/json"},
//       // //   credentials: "include",
//       // //   body: JSON.stringify(formData),
//       // // })
//       // // await signUp(formData)
//       // setIsSubmitting(false)
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
//     <AdminLayout>
//       <div className={classes.main}>
//         <Paper className={classes.paper}>
//           <h3 className={classes.title}>Product</h3>
//           <Divider />
//           <form noValidate onSubmit={handleSubmit(handleProductAdd)} style={{marginTop: "1em"}}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   label="name"
//                   {...register("product_name")}
//                 />
//                 <p>{errors.product_name?.message}</p>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   id="brand"
//                   label="brand"
//                   {...register("brand")}
//                 />
//                 <p>{errors.brand?.message}</p>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   label="price"
//                   {...register("price")}
//                 />
//                 <p style={{color: red500}}>{errors.price?.message}</p>
//               </Grid>
//               <Grid item xs={12}>
//                 <Controller
//                   name="category_id"
//                   control={control}
//                   render={({field}) => (
//                     <Select {...field} required style={{width: "100%"}}>
//                       {categories?.map((category: Category) => (
//                         <MenuItem key={category.id} value={category.id}>
//                           {category.category_name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   label="count_in_stock"
//                   {...register("count_in_stock")}
//                 />
//                 <p style={{color: red500}}>{errors.count_in_stock?.message}</p>
//               </Grid>
//               <Grid item xs={12} style={{marginTop: "1em"}}>
//                 <div>
//                   <UploadFile />
//                 </div>
//               </Grid>
//             </Grid>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "right",
//                 alignItems: "center",
//                 marginTop: 20,
//               }}
//             >
//               <Button
//                 type="button"
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 onClick={() => router.push("/admin/product")}
//               >
//                 <ArrowBackIosIcon />
//                 <p style={{margin: 5}}>Back</p>
//               </Button>

//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//                 disableElevation
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <CircularProgress size={25} />
//                 ) : (
//                   <div style={{display: "flex", alignItems: "center"}}>
//                     <SaveIcon style={{margin: 5}} />
//                     <p style={{margin: 5}}>Save</p>
//                   </div>
//                 )}
//               </Button>
//             </div>
//           </form>
//           <div className={classes.clear} />
//         </Paper>
//       </div>
//     </AdminLayout>
//   )
// }

// const UploadFile = () => {
//   const [files, setFiles] = useState<any>("")
//   //state for checking file size
//   const [fileSize, setFileSize] = useState(true)
//   // for file upload progress message
//   const [fileUploadProgress, setFileUploadProgress] = useState(false)
//   //for displaying response message
//   const [fileUploadResponse, setFileUploadResponse] = useState(null)
//   //base end point url
//   const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8282"

//   const uploadFileHandler = (event: any) => {
//     setFiles(event.target.files)
//   }

//   const fileSubmitHandler = (event: any) => {
//     event.preventDefault()
//     setFileSize(true)
//     setFileUploadProgress(true)
//     setFileUploadResponse(null)
//     console.log("files", files)

//     const formData = new FormData()

//     for (let i = 0; i < files.length; i++) {
//       if (files[i].size > 1024) {
//         setFileSize(false)
//         setFileUploadProgress(false)
//         setFileUploadResponse(null)
//         return
//       }

//       formData.append(`files`, files[i])
//     }

//     const requestOptions = {
//       method: "POST",
//       body: formData,
//     }
//     fetch("http://localhost:8080/api" + "/upload", requestOptions)
//       .then(async (response) => {
//         const isJson = response.headers.get("content-type")?.includes("application/json")
//         const data = isJson && (await response.json())

//         // check for error response
//         if (!response.ok) {
//           // get error message
//           const error = (data && data.message) || response.status
//           setFileUploadResponse(data.message)
//           return Promise.reject(error)
//         }

//         console.log(data.message)
//         setFileUploadResponse(data.message)
//       })
//       .catch((error) => {
//         console.error("Error while uploading file!", error)
//       })
//     setFileUploadProgress(false)
//   }

//   return (
//     <form onSubmit={fileSubmitHandler}>
//       <input type="file" multiple onChange={uploadFileHandler} />
//       <button type="submit">Upload</button>
//       {!fileSize && <p style={{color: "red"}}>File size exceeded!!</p>}
//       {fileUploadProgress && <p style={{color: "red"}}>Uploading File(s)</p>}
//       {fileUploadResponse != null && <p style={{color: "green"}}>{fileUploadResponse}</p>}
//     </form>
//   )
// }

// const UploadFile = () => {
// const [files, setFiles] = useState<any>("")
// //state for checking file size
// const [fileSize, setFileSize] = useState(true)
// // for file upload progress message
// const [fileUploadProgress, setFileUploadProgress] = useState(false)
// //for displaying response message
// const [fileUploadResponse, setFileUploadResponse] = useState(null)
// //base end point url
// const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8282"

// const uploadFileHandler = (event: any) => {
//   setFiles(event.target.files)
// }

// const fileSubmitHandler = (event: any) => {
//   event.preventDefault()
//   setFileSize(true)
//   setFileUploadProgress(true)
//   setFileUploadResponse(null)
//   console.log("files", files)

//   const formData = new FormData()

//   for (let i = 0; i < files.length; i++) {
//     if (files[i].size > 1024) {
//       setFileSize(false)
//       setFileUploadProgress(false)
//       setFileUploadResponse(null)
//       return
//     }

//     formData.append(`files`, files[i])
//   }

//   const requestOptions = {
//     method: "POST",
//     body: formData,
//   }
//   fetch("http://localhost:8080/api" + "/upload", requestOptions)
//     .then(async (response) => {
//       const isJson = response.headers.get("content-type")?.includes("application/json")
//       const data = isJson && (await response.json())

//       // check for error response
//       if (!response.ok) {
//         // get error message
//         const error = (data && data.message) || response.status
//         setFileUploadResponse(data.message)
//         return Promise.reject(error)
//       }

//       console.log(data.message)
//       setFileUploadResponse(data.message)
//     })
//     .catch((error) => {
//       console.error("Error while uploading file!", error)
//     })
//   setFileUploadProgress(false)
// }

//   return (
//     <form onSubmit={fileSubmitHandler}>
//       <input type="file" multiple onChange={uploadFileHandler} />
//       <button type="submit">Upload</button>
//       {!fileSize && <p style={{color: "red"}}>File size exceeded!!</p>}
//       {fileUploadProgress && <p style={{color: "red"}}>Uploading File(s)</p>}
//       {fileUploadResponse != null && <p style={{color: "green"}}>{fileUploadResponse}</p>}
//     </form>
//   )
// }

// const ProductAdd = () => {
//   const handleClick = async () => {
//     // const formData: Product = {
//     //   product_name: "name",
//     //   slug: "name",
//     //   brand: "brand",
//     //   price: 1000,
//     //   count_in_stock: 1000,
//     //   description: "desc",
//     //   category_id: 1,
//     // }
//     const formData = new FormData()
//     formData.append("product_name", "name")
//     formData.append("slug", "slug")
//     formData.append("brand", "brand")
//     formData.append("price", "1000")
//     formData.append("count_in_stock", "1000")
//     formData.append("description", "description")
//     formData.append("category_id", "1")
//     for (let i = 0; i < files.length; i++) {
//       if (files[i].size > 1024) {
//         setFileSize(false)
//         setFileUploadProgress(false)
//         setFileUploadResponse(null)
//         return
//       }

//       formData.append(`files`, files[i])
//     }
//     // await axios.post(`${BaseURL}/products`, formData)
//     await fetch(`${BaseURL}/products`, {
//       method: "POST",
//       // headers: {"Content-Type": "application/json"},
//       // headers: {"Content-Type": "multipart/form-data"},
//       credentials: "include",
//       body: formData,
//     })
//   }
//   return (
//     <div>
//       <button onClick={() => handleClick()}>button</button>
//     </div>
//   )
// }
// export default ProductAdd
