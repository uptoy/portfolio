import React, {useState, useReducer} from "react"
import ImageUploading from "react-images-uploading"
import NextImage from "next/image"
import SaveIcon from "@material-ui/icons/Save"
import {Category} from "@types"
import {AdminLayout} from "components/dashboard"
import {useForm, Controller} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {productFormSchema} from "yup/schema"
import {ProductType} from "yup/type"
import toast from "react-hot-toast"
import useSWR from "swr"
import {
  Button,
  MenuItem,
  Divider,
  TextField,
  Grid,
  Paper,
  Select,
  CircularProgress,
} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import {common} from "@material-ui/core/colors"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import {useRouter} from "next/router"
import {red} from "@material-ui/core/colors"
import AddIcon from "@material-ui/icons/Add"
import CancelIcon from "@material-ui/icons/Cancel"

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
    width: "100%",
    minHeight: "10em",
    marginBottom: 30,
  },
  uploadText: {
    margin: 0,
    paddingTop: 40,
    textAlign: "center",
    fontSize: "1em",
  },
  show: {
    display: "grid",
    gap: 15,
    gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))",
    width: "100%",
    //     // padding: "1em 0",
    marginTop: "1em",
  },
  cancel: {
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    bottom: "90%",
    left: "78%",
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
  const classes = useStyles()
  return (
    <>
      <AdminLayout>
        <Paper className={classes.paper}>
          <h3 className={classes.title}>Product Edit</h3>
          <Divider />
          <ProductAddForm />
          <div className={classes.clear} />
        </Paper>
      </AdminLayout>
    </>
  )
}

export const fetcher = (url: any) =>
  fetch(url, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  }).then((r) => r.json())

const ProductAddForm = () => {
  const {data, error, mutate} = useSWR(`${BaseURL}/category`, fetcher)
  const categories: Category[] = data?.data
  const classes = useStyles()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<ProductType>({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      category_id: 1,
    },
  })
  // const [files, setFiles] = useState<any>("")
  // const [fileSize, setFileSize] = useState(true)
  // const [fileUploadProgress, setFileUploadProgress] = useState(false)
  // const [fileUploadResponse, setFileUploadResponse] = useState(null)

  // const uploadFileHandler = (event: any) => {
  //   setFiles(event.target.files)
  // }
  const [files, setFiles] = React.useState([])
  const maxNumber = 5
  const onChange = (imageList: any, addUpdateIndex: any) => {
    console.log(imageList, addUpdateIndex)
    setFiles(imageList)
  }

  const onSubmit = async (productData: any) => {
    const product_name: any = productData.product_name
    const str: any = productData.product_name
    const slug = str.replace(/[^0-9a-z]/gi, "")
    const brand: any = productData.brand
    const price: any = productData.price
    const count_in_stock: any = productData.count_in_stock
    const description: any = productData.description
    const category_id: any = productData.category_id
    try {
      setIsSubmitting(true)
      const formData: any = new FormData()
      formData.append("product_name", product_name)
      formData.append("slug", slug)
      formData.append("brand", brand)
      formData.append("price", price)
      formData.append("count_in_stock", count_in_stock)
      formData.append("description", description)
      formData.append("category_id", category_id)
      for (let i = 0; i < files.length; i++) {
        formData.append(`files`, files[i])
      }
      await fetch(`${BaseURL}/products`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
      setIsSubmitting(false)
      router.push("/admin/products")
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
          <TextField variant="outlined" required fullWidth label="price" {...register("price")} />
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
          <ImageUploading
            multiple
            value={files}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              // onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <div
                  className={classes.upload}
                  style={isDragging ? {color: "red"} : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <p className={classes.uploadText}>Click or Drop here</p>
                </div>

                {/* <button className="btn btn-danger" onClick={onImageRemoveAll}>
                    Remove all images
                  </button> */}
                <div className={classes.show}>
                  {imageList.map((image, index) => (
                    <div key={index} className={classes.imageItem}>
                      <NextImage src={image["data_url"]} height={100} width={100} />
                      <CancelIcon className={classes.cancel} onClick={() => onImageRemove(index)} />
                      {/* <button className="btn btn-primary" onClick={() => onImageUpdate(index)}>
                        Update
                      </button> */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
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
  )
}

// const AdminProductAdd = () => {
//   const [images, setImages] = React.useState([])
//   const maxNumber = 69

//   const onChange = (imageList: any, addUpdateIndex: any) => {
//     // data for submit
//     console.log(imageList, addUpdateIndex)
//     setImages(imageList)
//   }
//   return (
//     <div>
//       <div>
//         <ImageUploading
//           multiple
//           value={images}
//           onChange={onChange}
//           maxNumber={maxNumber}
//           dataURLKey="data_url"
//         >
//           {({
//             imageList,
//             onImageUpload,
//             onImageRemoveAll,
//             onImageUpdate,
//             onImageRemove,
//             isDragging,
//             dragProps,
//           }) => (
//             // write your building UI
//             <div className="upload__image-wrapper">
//               <div className="mainbtndiv">
//                 <button
//                   className="btn btn-primary"
//                   style={isDragging ? {color: "red"} : undefined}
//                   onClick={onImageUpload}
//                   {...dragProps}
//                 >
//                   Click or Drop here
//                 </button>

//                 <button className="btn btn-danger" onClick={onImageRemoveAll}>
//                   Remove all images
//                 </button>
//               </div>
//               {imageList.map((image, index) => (
//                 <div key={index} className="image-item mt-5 mb-5 mr-5">
//                   <NextImage src={image["data_url"]} height={100} width={100} />
//                   <div className="image-item__btn-wrapper">
//                     <button className="btn btn-primary" onClick={() => onImageUpdate(index)}>
//                       Update
//                     </button>
//                     <button className="btn btn-danger" onClick={() => onImageRemove(index)}>
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </ImageUploading>
//       </div>
//     </div>
//   )
// }

// export default AdminProductAdd
