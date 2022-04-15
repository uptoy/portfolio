import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import {makeStyles} from "@material-ui/styles"
import TextField from "@material-ui/core/TextField"
import {unwrapResult} from "@reduxjs/toolkit"
import {useState} from "react"
import {useForm, Controller} from "react-hook-form"
import toast from "react-hot-toast"
import {
  setSelectedModal,
  addProduct,
  setSelectedProduct,
  updateProduct,
  fetchProducts,
} from "features/product/productSlice"

import {useAppDispatch, useAppSelector} from "app/hooks"
import Modal from "components/Modal/Modal"

interface FormData {
  id: number
  product_name: string
  slug: string
  brand: string
  price: number
  category_id: string
  count_in_stock: number
  description: string
  average_rating: number
  createdAt?: string
  updatedAt?: string
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
}))

const ProductManageModal = () => {
  const classes = useStyles()

  const {selectedProduct, selectedModal} = useAppSelector((state) => state.product)

  const defaultValues = {
    id: selectedProduct?.id || 0,
    product_name: selectedProduct?.product_name || "",
    slug: selectedProduct?.slug || "",
    brand: selectedProduct?.brand || "",
    price: selectedProduct?.price || 0,
  }

  const {handleSubmit, control} = useForm<FormData>({
    defaultValues,
  })

  const dispatch = useAppDispatch()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const productManageModalTitle = selectedProduct ? "Edit Product" : "Add New Product"

  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true)

      if (selectedProduct) {
        const results = await dispatch(updateProduct({id: selectedProduct.id, fields: formData}))
        unwrapResult(results)
        toast.success("You have successfully updated  product")
      } else {
        const results = await dispatch(addProduct(formData))
        unwrapResult(results)
        toast.success("You have successfully added new product")
      }
    } catch (error) {
      toast.error(error.message)
      setIsSubmitting(false)
    }
    handleCloseProductModal()
    dispatch(fetchProducts())
  }

  const handleCloseProductModal = () => {
    dispatch(setSelectedModal(null))
    dispatch(setSelectedProduct(null))
  }

  return (
    <Modal
      name={productManageModalTitle}
      isVisible={selectedModal === "manageProductModal"}
      onClose={handleCloseProductModal}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="product_name"
          control={control}
          defaultValue=""
          rules={{
            required: "Product Name is required field",
          }}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              className={classes.input}
              margin="normal"
              onChange={onChange}
              value={value}
              fullWidth
              id="product_name"
              label="Product Name"
              name="product_name"
              autoComplete="true"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />
        <div className={classes.buttonContainer}>
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
    </Modal>
  )
}

export default ProductManageModal
