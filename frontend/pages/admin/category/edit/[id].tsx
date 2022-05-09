import React, {useState, useEffect} from "react"
import SaveIcon from "@material-ui/icons/Save"
import {Category} from "@types"
import {AdminLayout} from "components/dashboard"
import {useForm, SubmitHandler} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {categoryFormSchema} from "yup/schema"
import {CategoryType} from "yup/type"
import toast from "react-hot-toast"
import {Button, Divider, TextField, Grid, Paper, CircularProgress} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import {useRouter} from "next/router"
import {fetcher} from "pages/admin/product/add"
import useSWR from "swr"

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
    marginTop: "1em",
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
  clear: {
    clear: "both",
  },
  loadingContainer: {
    textAlign: "center",
    margin: "100px 0",
  },
}))

export interface ManageCategoryFields {
  id?: number
  category_name: string
  created_at: Date
  updated_at: Date
}

// interface FormData {
//   product_name: string
//   slug: string
//   brand: string
//   price: number
//   category_id: number
//   count_in_stock: number
//   description: string
// }

interface CategoryManageFormProps {
  id?: string
  fields?: ManageCategoryFields
}

export default function CategoryEdit() {
  const classes = useStyles()
  const router = useRouter()
  const id = router.query.id as string
  const {data, error} = useSWR(`${BaseURL}/categories/${id}`, fetcher)
  const category: Category = data?.data
  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    )
  }
  const fields: ManageCategoryFields = {
    category_name: category?.category_name,
    created_at: category?.created_at,
    updated_at: category?.updated_at,
  }
  return (
    <>
      <AdminLayout>
        <Paper className={classes.paper}>
          <h3 className={classes.title}>Category Edit</h3>
          <Divider />
          <CategoryEditForm id={id} fields={fields} />
          <div className={classes.clear} />
        </Paper>
      </AdminLayout>
    </>
  )
}

const CategoryEditForm = ({id, fields}: CategoryManageFormProps) => {
  const classes = useStyles()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    setValue,
  } = useForm<CategoryType>({
    resolver: yupResolver(categoryFormSchema),
  })
  useEffect(() => {
    if (fields) {
      setValue("category_name", fields.category_name)
      setValue("created_at", fields.created_at)
      setValue("updated_at", fields.updated_at)
    }
  }, [fields, setValue])

  const onSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true)
      await fetch(`${BaseURL}/categories/${id}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(formData),
      })
      setIsSubmitting(false)
      toast.success("Edit Category")
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
            label="category"
            {...register("category_name")}
          />
          <p>{errors.category_name?.message}</p>
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
