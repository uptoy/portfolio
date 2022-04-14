import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import {makeStyles} from "@material-ui/styles"
import TextField from "@material-ui/core/TextField"
import {unwrapResult} from "@reduxjs/toolkit"
import {useState} from "react"
import {useForm, Controller} from "react-hook-form"
import toast from "react-hot-toast"
// import {
//   setSelectedModal,
//   addCategory,
//   setSelectedCategory,
//   updateCategory,
// } from "features/category/categorySlice"

import {useAppDispatch, useAppSelector} from "app/hooks"
import Modal from "components/Modal/Modal"

interface FormData {
  category_name: string
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

const CategoryManageModal = () => {
  const classes = useStyles()

  const {selectedCategory, selectedModal} = useAppSelector((state) => state.category)

  const defaultValues = {
    category_name: selectedCategory?.category_name || "",
  }

  const {handleSubmit, control} = useForm<FormData>({
    defaultValues,
  })

  const dispatch = useAppDispatch()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const categoryManageModalTitle = selectedCategory ? "Edit Category" : "Add New Category"

  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true)

      if (selectedCategory) {
        // const results = await dispatch(updateCategory({id: selectedCategory.id, fields: formData}))
        // unwrapResult(results)
        toast.success("You have successfully updated  category")
      } else {
        // const results = await dispatch(addCategory(formData))
        // unwrapResult(results)
        toast.success("You have successfully added new category")
      }

      handleCloseCategoryModal()
    } catch (error) {
      toast.error(error.message)
      setIsSubmitting(false)
    }
  }

  const handleCloseCategoryModal = () => {
    // dispatch(setSelectedModal(null))
    // dispatch(setSelectedCategory(null))
  }

  return (
    <Modal
      name={categoryManageModalTitle}
      isVisible={selectedModal === "manageCategoryModal"}
      onClose={handleCloseCategoryModal}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="category_name"
          control={control}
          defaultValue=""
          rules={{
            required: "Name is required field",
          }}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              className={classes.input}
              margin="normal"
              onChange={onChange}
              value={value}
              fullWidth
              id="category_name"
              label="Category Name"
              name="category_name"
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

export default CategoryManageModal

// import Button from "@material-ui/core/Button"
// import CircularProgress from "@material-ui/core/CircularProgress"
// import {makeStyles} from "@material-ui/core/styles"
// import TextField from "@material-ui/core/TextField"
// import {unwrapResult} from "@reduxjs/toolkit"
// import {useState} from "react"
// import {useForm, Controller} from "react-hook-form"
// import toast from "react-hot-toast"
// import {
//   setSelectedModal,
//   addCategory,
//   setSelectedCategory,
//   updateCategory,
// } from "features/category/categorySlice"

// import {useAppDispatch, useAppSelector} from "app/hooks"
// import SimpleModal from "components/Modal/SimpleModal"

// interface FormData {
//   name: string
// }

// const useStyles: any = makeStyles(() => ({
//   input: {
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "flex-end",
//     marginTop: 20,
//   },
// }))

// const CategoryManageModal = () => {
//   const classes = useStyles()

//   const {selectedCategory, selectedModal} = useAppSelector((state) => state.category)

//   const defaultValues = {
//     name: selectedCategory?.name || "",
//   }

//   const {handleSubmit, control} = useForm<FormData>({
//     defaultValues,
//   })

//   const dispatch = useAppDispatch()

//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const budgetManageModalTitle = selectedCategory ? "Edit Category" : "Add New Category"

//   const onSubmit = async (formData: FormData) => {
//     try {
//       setIsSubmitting(true)

//       if (selectedCategory) {
//         const results = await dispatch(updateCategory({id: selectedCategory.id, fields: formData}))
//         unwrapResult(results)
//         toast.success("You have successfully updated  category")
//       } else {
//         const results = await dispatch(addCategory(formData))
//         unwrapResult(results)
//         toast.success("You have successfully added new category")
//       }

//       handleCloseCategoryModal()
//     } catch (error) {
//       toast.error(error.message)
//       setIsSubmitting(false)
//     }
//   }

//   const handleCloseCategoryModal = () => {
//     dispatch(setSelectedModal(null))
//     dispatch(setSelectedCategory(null))
//   }

//   return (
//     <SimpleModal
//       title={budgetManageModalTitle}
//       isVisible={selectedModal === "manageCategoryModal"}
//       onClose={handleCloseCategoryModal}
//     >
//       <form noValidate onSubmit={handleSubmit(onSubmit)}>
//         <Controller
//           name="name"
//           control={control}
//           defaultValue=""
//           rules={{
//             required: "Title is required field",
//           }}
//           render={({field: {onChange, value}, fieldState: {error}}) => (
//             <TextField
//               className={classes.input}
//               margin="normal"
//               onChange={onChange}
//               value={value}
//               fullWidth
//               id="name"
//               label="Name"
//               name="name"
//               autoComplete="true"
//               error={Boolean(error)}
//               helperText={error?.message}
//             />
//           )}
//         />

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
//     </SimpleModal>
//   )
// }

// export default CategoryManageModal

// import SimpleModal from "components/Modal/SimpleModal"
// import {TextField, Button} from "@material-ui/core"
// import {makeStyles} from "@material-ui/styles"
// import {createStyles} from "@material-ui/core/styles"

// interface IProps {
//   open: boolean
//   handleClose(): void
// }

// const useStyles: any = makeStyles(() =>
//   createStyles({
//     submit_container: {
//       marginLeft: "auto",
//       marginTop: "1em",
//       width: "9.5em",
//     },
//   })
// )

// // create
// // edit
// const CategoryManageModal = (props: IProps) => {
//   const classes = useStyles()
//   return (
//     <>
//       <SimpleModal open={props.open} handleClose={props.handleClose}>
//         <p>Add New Category</p>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           id="category"
//           label="Category"
//           name="category"
//           autoFocus
//         />
//         <div className={classes.submit_container}>
//           <Button variant="contained" style={{marginRight: "1em"}}>
//             Back
//           </Button>
//           <Button variant="contained">Save</Button>
//         </div>
//       </SimpleModal>
//     </>
//   )
// }

// export default CategoryManageModal
