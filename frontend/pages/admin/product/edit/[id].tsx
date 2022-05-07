import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import {makeStyles} from "@material-ui/styles"
import TextField from "@material-ui/core/TextField"
import {unwrapResult} from "@reduxjs/toolkit"
import {useState, useEffect} from "react"
import FormControl from "@material-ui/core/FormControl"

import {useForm, Controller} from "react-hook-form"
import toast from "react-hot-toast"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Alert from "@material-ui/lab/Alert"
import {useAppDispatch, useAppSelector} from "app/hooks"
import {useRouter} from "next/router"
import useSWR from "swr"
import {Product} from "@types"
import {
  Snackbar,
  Divider,
  LinearProgress,
  MenuItem,
  Avatar,
  FormControlLabel,
  Container,
  Box,
  Grid,
  Checkbox,
  Paper,
  Select,
} from "@material-ui/core"
const BaseURL = "http://localhost:8080/api"

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

const useStyles: any = makeStyles(() => ({
  input: {
    marginBottom: 20,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  loadingContainer: {
    textAlign: "center",
    margin: "100px 0",
  },
}))

interface ProductManageFormProps {
  id?: string
  fields?: ManageProductFields
}

const defaultValues = {
  product_name: "",
  slug: "",
  brand: "",
  price: 0,
  category_id: 0,
  count_in_stock: 0,
  description: "",
}

export default function ProductEdit() {
  const fetcher = (url: any) =>
    fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    }).then((r) => r.json())
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const id = router.query.id as string
  const {data, error, mutate} = useSWR(`${BaseURL}/products/${id}`, fetcher)
  const product: Product = data?.data
  console.log("product", product)
  const product_name = product?.product_name
  const slug = product?.slug
  const brand = product?.brand
  const price = product?.price
  const category_id = product?.category_id
  const count_in_stock = product?.count_in_stock
  const description = product?.description
  const category = product?.category
  const fields: ManageProductFields = {
    product_name: product_name,
    slug: slug,
    brand: brand,
    price: price,
    category_id: category_id,
    count_in_stock: count_in_stock,
    description: description,
    category: category as any,
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Edit Category</Typography>
        <CategoryManageForm id={id} fields={fields} />
      </CardContent>
    </Card>
  )
}

const CategoryManageForm = ({id, fields}: ProductManageFormProps) => {
  console.log("fields.category", fields?.category)
  const fetcher = (url: any) =>
    fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    }).then((r) => r.json())
  const classes = useStyles()
  const {handleSubmit, control, setValue} = useForm<FormData>({
    defaultValues,
  })
  const {data} = useSWR(`${BaseURL}/category`, fetcher)
  const categories: any = data?.data
  console.log("categories", categories)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true)
      if (id) {
        // const results = await dispatch(updateCategory({id, fields: formData}))
        // unwrapResult(results)
        // toast.success("You have successfully updated  category")
      } else {
        // const results = await dispatch(addCategory(formData))
        // unwrapResult(results)
        // toast.success("You have successfully added new category")
      }
      // navigate("/categories")
    } catch (error) {
      // toast.error(error.message)
      // setIsSubmitting(false)
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="product_name"
        control={control}
        defaultValue=""
        rules={{
          required: "Title is required field",
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextField
            // className={classes.input}
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
      {/* <Controller
        name="category_id"
        control={control}
        defaultValue={0}
        rules={{
          required: "Title is required field",
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextField
            // className={classes.input}
            margin="normal"
            onChange={onChange}
            value={value}
            fullWidth
            id="category_id"
            label="category_id"
            name="category_id"
            autoComplete="true"
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      /> */}
      {/* <Controller
        name="category_id"
        control={control}
        defaultValue={3}
        rules={{
          required: "Title is required field",
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <Select required style={{width: "100%"}} onChange={onChange} id="category_id">
            {categories?.map((category: any) => (
              <MenuItem key={category.id} value={category.category_name}>
                {category.category_name}
              </MenuItem>
            ))}
          </Select>
        )}
      /> */}
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
      <Controller
        name="slug"
        control={control}
        defaultValue=""
        rules={{
          required: "Title is required field",
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextField
            // className={classes.input}
            margin="normal"
            onChange={onChange}
            value={value}
            fullWidth
            id="slug"
            label="slug"
            name="slug"
            autoComplete="true"
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="brand"
        control={control}
        defaultValue=""
        rules={{
          required: "Title is required field",
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextField
            // className={classes.input}
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
      <Controller
        name="price"
        control={control}
        defaultValue={1}
        rules={{
          required: "Title is required field",
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextField
            // className={classes.input}
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
      <Controller
        name="count_in_stock"
        control={control}
        defaultValue={1}
        rules={{
          required: "Title is required field",
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextField
            // className={classes.input}
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
      <Controller
        name="description"
        control={control}
        defaultValue=""
        rules={{
          required: "Title is required field",
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextField
            // className={classes.input}
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
      {/* <div className={classes.buttonContainer}> */}
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={25} /> : "Submit"}
        </Button>
      </div>
    </form>
  )
}
