import React, {useState, useEffect} from "react"
import SaveIcon from "@material-ui/icons/Save"
import {yupResolver} from "@hookform/resolvers/yup"
import {productFormSchema} from "yup/schema"
import {AdminLayout} from "components/dashboard"
import {ProductType} from "yup/type"
import {useForm, Controller} from "react-hook-form"
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
import {fetcher} from "../add"
import toast from "react-hot-toast"
import {Image} from "@types"
import NextImage from "next/image"
import ImageUploading from "react-images-uploading"
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
    gap: 30,
    gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))",
    width: "100%",
    //     // padding: "1em 0",
    marginTop: "0.2em",
  },
  cancel: {
    position: "absolute",
    bottom: "88%",
    left: "78%",
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
  saveButton: {
    marginTop: 10,
    marginLeft: 10,
    width: "7em",
    height: "3.4em",
  },
  clear: {
    clear: "both",
  },
}))

export interface Category {
  id: number
  category_name: string
}

export interface ManageProductFields {
  id?: number
  product_name: string
  slug: string
  brand: string
  price: number
  category_id: number
  count_in_stock: number
  description: string
  category: Category
  images: Image[]
}

interface FormData {
  product_name: string
  slug: string
  brand: string
  price: number
  category_id: number
  count_in_stock: number
  description: string
}

interface ProductManageFormProps {
  id?: string
  fields?: ManageProductFields
}

export default function ProductEdit() {
  const classes = useStyles()
  const router = useRouter()
  const id = router.query.id as string
  const {data, error} = useSWR(`${BaseURL}/products/${id}`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const product: any = data?.data
  const product_name = product?.product_name
  const slug = product?.slug
  const brand = product?.brand
  const price = product?.price
  const category_id = product?.category_id
  const count_in_stock = product?.count_in_stock
  const description = product?.description
  const category = product?.category
  const images = product?.images
  const fields: ManageProductFields = {
    product_name: product_name,
    slug: slug,
    brand: brand,
    price: price,
    category_id: category_id,
    count_in_stock: count_in_stock,
    description: description,
    category: category as any,
    images: images,
  }
  return (
    <>
      <AdminLayout>
        <Paper className={classes.paper}>
          <h3 className={classes.title}>Product Edit</h3>
          <Divider />
          <ProductEditForm id={id} fields={fields} />
          <div className={classes.clear} />
        </Paper>
      </AdminLayout>
    </>
  )
}

const ProductEditForm = ({id, fields}: ProductManageFormProps) => {
  const classes = useStyles()
  const router = useRouter()
  const [files, setFiles] = useState<any>("")
  const maxNumber = 5
  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
  } = useForm<ProductType>({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      category_id: 1,
    },
  })
  const images = fields?.images
  console.log("iamges", images)
  const {data} = useSWR(`${BaseURL}/category`, fetcher)
  const categories: any = data?.data
  const [isSubmitting, setIsSubmitting] = useState(false)
  const onChange = (imageList: any, addUpdateIndex: any) => {
    console.log(imageList, addUpdateIndex)
    setFiles(imageList)
  }
  useEffect(() => {
    if (fields) {
      setValue("product_name", fields.product_name)
      setValue("slug", fields.slug)
      setValue("brand", fields.brand)
      setValue("price", fields.price)
      setValue("category_id", fields.category_id)
      setValue("count_in_stock", fields.count_in_stock)
      setValue("description", fields.description)
    }
  }, [fields, setValue])
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
      await fetch(`${BaseURL}/products/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      })
      setIsSubmitting(false)
      toast.success("Success Edit Product")
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
          <Controller
            name="product_name"
            control={control}
            defaultValue=""
            rules={{
              required: "Title is required field",
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextField
                margin="normal"
                onChange={onChange}
                value={value}
                fullWidth
                id="product_name"
                label="product name"
                name="product_name"
                autoComplete="true"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="brand"
            control={control}
            defaultValue=""
            rules={{
              required: "Title is required field",
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextField
                margin="normal"
                onChange={onChange}
                value={value}
                fullWidth
                id="brand"
                label="brand"
                name="brand"
                autoComplete="true"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="price"
            control={control}
            defaultValue={1}
            rules={{
              required: "Title is required field",
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextField
                margin="normal"
                onChange={onChange}
                value={value}
                fullWidth
                id="price"
                label="price"
                name="price"
                autoComplete="true"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
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
          <Controller
            name="count_in_stock"
            control={control}
            defaultValue={1}
            rules={{
              required: "Title is required field",
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextField
                margin="normal"
                onChange={onChange}
                value={value}
                fullWidth
                id="count_in_stock"
                label="count_in_stock"
                name="count_in_stock"
                autoComplete="true"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              required: "Title is required field",
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <TextField
                margin="normal"
                onChange={onChange}
                value={value}
                fullWidth
                id="description"
                label="description"
                name="description"
                autoComplete="true"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} style={{marginTop: "1em"}}>
          <ImageUploading
            multiple
            value={files}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({imageList, onImageUpload, onImageRemove, isDragging, dragProps}) => (
              <div className="upload__image-wrapper">
                <div
                  className={classes.upload}
                  style={isDragging ? {color: "red"} : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <p className={classes.uploadText}>Click or Drop here</p>
                </div>
                {/* <div className={classes.show}>
                  {images?.map((image, index) => (
                    <div key={index} className={classes.imageItem}>
                      <NextImage src={image["url"]} height={100} width={100} />
                      <CancelIcon className={classes.cancel} onClick={() => onImageRemove(index)} />
                    </div>
                  ))}
                </div> */}
                <div className={classes.show}>
                  {imageList.map((image, index) => (
                    <div key={index} className={classes.imageItem}>
                      <NextImage src={image["data_url"]} height={100} width={100} />
                      <CancelIcon className={classes.cancel} onClick={() => onImageRemove(index)} />
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
          style={{marginTop: 10, marginLeft: 10}}
          onClick={() => router.push("/admin/product")}
        >
          <ArrowBackIosIcon />
          <p style={{margin: 5}}>Back</p>
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          // className={classes.saveButton}
          style={{
            marginTop: 10,
            marginLeft: 10,
            width: "7em",
            height: "3.4em",
          }}
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
