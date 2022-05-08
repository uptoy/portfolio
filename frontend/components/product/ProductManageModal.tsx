import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import {makeStyles} from "@material-ui/styles"
import TextField from "@material-ui/core/TextField"
import {unwrapResult} from "@reduxjs/toolkit"
import {useState} from "react"
import {Image} from "@types"
import {useForm, Controller} from "react-hook-form"
import {ImageUpload} from "components/imageUpload/ImageUpload"
import toast from "react-hot-toast"
import {
  setSelectedModal,
  addProduct,
  setSelectedProduct,
  updateProduct,
  fetchProducts,
} from "features/product/productSlice"

import TextareaAutosize from "@material-ui/core/TextareaAutosize"

import {useAppDispatch, useAppSelector} from "app/hooks"
import {Modal} from "components/modal"

interface FormData {
  id: string
  product_name: string
  slug: string
  brand: string
  price: string
  category_id: string
  count_in_stock: string
  description: string
  // average_rating: string
  createdAt?: Date | null
  updatedAt?: Date | null
  images: Image[]
}

const useStyles: any = makeStyles(() => ({
  input: {
    margin: "16px 0px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    // marginTop: 20,
  },
  textarea: {
    width: "100%",
    margin: "16px 0px",
    opacity: "0.7",
    fontSize: "1em",
    padding: "16.5px 14px",
    borderWidth: "1.25px",
    borderRadius: "5px",
  },
}))

const ProductManageModal = () => {
  const classes = useStyles()

  const {selectedProduct, selectedModal} = useAppSelector((state) => state.product)

  // image number?
  const defaultValues = {
    id: selectedProduct?.id.toString() || "",
    product_name: selectedProduct?.product_name || "",
    slug: selectedProduct?.slug || "",
    brand: selectedProduct?.brand || "",
    price: selectedProduct?.price.toString() || "",
    category_id: selectedProduct?.category_id.toString() || "",
    count_in_stock: selectedProduct?.count_in_stock.toString() || "",
    description: selectedProduct?.description || "",
    // average_rating: selectedProduct?.average_rating.toString() || "",
    images: selectedProduct?.images || [],
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
      const fields = {
        ...formData,
        id: Number(formData.id),
        price: Number(formData.price),
        category_id: Number(formData.category_id),
        count_in_stock: Number(formData.count_in_stock),
        average_rating: Number(formData.average_rating),
      }

      if (selectedProduct) {
        const results = await dispatch(updateProduct({id: selectedProduct.id, fields}))
        unwrapResult(results)
        toast.success("You have successfully updated  product")
      } else {
        const results = await dispatch(addProduct(fields))
        unwrapResult(results)
        toast.success("You have successfully added new product")
      }
      setIsSubmitting(false)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        console.log("Failed", error.message)
      } else {
        console.log("Unknown Failure", error)
      }
      setIsSubmitting(false)
    }
    handleCloseProductModal()
    dispatch(fetchProducts())
    dispatch(setSelectedModal(null))
  }

  const handleCloseProductModal = () => {
    dispatch(setSelectedModal(null))
    dispatch(setSelectedProduct(null))
  }
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Modal
      title={productManageModalTitle}
      isVisible={selectedModal === "manageProductModal"}
      onClose={handleCloseProductModal}
    >
      aaa
    </Modal>
  )
  // return (
  //   <Modal
  //     title={productManageModalTitle}
  //     isVisible={selectedModal === "manageProductModal"}
  //     onClose={handleCloseProductModal}
  //   >
  //     <form noValidate onSubmit={handleSubmit(onSubmit)}>
  //       <div style={{display: "flex", width: "100%"}}>
  //         <div style={{width: "50%"}}>
  //           <Controller
  //             name="product_name"
  //             control={control}
  //             defaultValue=""
  //             rules={{
  //               required: "Product Name is required field",
  //             }}
  //             render={({field: {onChange, value}, fieldState: {error}}) => (
  //               <TextField
  //                 className={classes.input}
  //                 margin="normal"
  //                 onChange={onChange}
  //                 value={value}
  //                 fullWidth
  //                 id="product_name"
  //                 label="Product Name"
  //                 name="product_name"
  //                 error={Boolean(error)}
  //                 helperText={error?.message}
  //               />
  //             )}
  //           />
  //           <Controller
  //             name="brand"
  //             control={control}
  //             defaultValue=""
  //             rules={{
  //               required: "Brand is required field",
  //             }}
  //             render={({field: {onChange, value}, fieldState: {error}}) => (
  //               <TextField
  //                 margin="normal"
  //                 onChange={onChange}
  //                 value={value}
  //                 fullWidth
  //                 id="brand"
  //                 label="brand"
  //                 name="brand"
  //                 error={Boolean(error)}
  //                 helperText={error?.message}
  //               />
  //             )}
  //           />
  //           <Controller
  //             name="price"
  //             control={control}
  //             defaultValue=""
  //             rules={{
  //               required: "Price is required field",
  //             }}
  //             render={({field: {onChange, value}, fieldState: {error}}) => (
  //               <TextField
  //                 margin="normal"
  //                 onChange={onChange}
  //                 value={value}
  //                 fullWidth
  //                 id="price"
  //                 label="price"
  //                 name="price"
  //                 error={Boolean(error)}
  //                 helperText={error?.message}
  //               />
  //             )}
  //           />
  //           <Controller
  //             name="category_id"
  //             control={control}
  //             defaultValue=""
  //             rules={{
  //               required: "Category is required field",
  //             }}
  //             render={({field: {onChange, value}, fieldState: {error}}) => (
  //               <TextField
  //                 margin="normal"
  //                 onChange={onChange}
  //                 value={value}
  //                 fullWidth
  //                 id="category"
  //                 label="category"
  //                 name="category"
  //                 error={Boolean(error)}
  //                 helperText={error?.message}
  //               />
  //             )}
  //           />
  //           <Controller
  //             name="count_in_stock"
  //             control={control}
  //             defaultValue=""
  //             rules={{
  //               required: "Stock is required field",
  //             }}
  //             render={({field: {onChange, value}, fieldState: {error}}) => (
  //               <TextField
  //                 margin="normal"
  //                 onChange={onChange}
  //                 value={value}
  //                 fullWidth
  //                 id="stock"
  //                 label="stock"
  //                 name="stock"
  //                 error={Boolean(error)}
  //                 helperText={error?.message}
  //               />
  //             )}
  //           />
  //         </div>
  //         <div style={{width: "50%", marginLeft: "1em"}}>
  //           <Controller
  //             name="description"
  //             control={control}
  //             defaultValue=""
  //             // rules={{
  //             //   required: "Description is required field",
  //             // }}
  //             render={({field: {onChange, value}}) => (
  //               <TextareaAutosize
  //                 id="description"
  //                 value={value}
  //                 name="description"
  //                 aria-label="minimum height"
  //                 minRows={5}
  //                 placeholder="description"
  //                 onChange={onChange}
  //                 className={classes.textarea}
  //               />
  //             )}
  //           />
  //           <ImageUpload />
  //         </div>
  //       </div>
  //       <div className={classes.buttonContainer}>
  //         <Button
  //           type="submit"
  //           variant="contained"
  //           color="primary"
  //           size="large"
  //           disableElevation
  //           disabled={isSubmitting}
  //         >
  //           {isSubmitting ? <CircularProgress size={25} /> : "Submit"}
  //         </Button>
  //       </div>
  //     </form>
  //   </Modal>
  // )
}

export default ProductManageModal
