import {ListItem, ListItemText} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete"
import DeleteModal from "components/Modal/DeleteModal"
import {Button} from "@material-ui/core"
import {unwrapResult} from "@reduxjs/toolkit"
import {useState} from "react"
import toast from "react-hot-toast"
import {deleteProduct, setSelectedProduct, setSelectedModal} from "features/product/productSlice"
import {Product} from "types"
import {useAppDispatch} from "app/hooks"

interface IProps {
  product: Product
}

const useStyles: any = makeStyles(() => ({
  productItem: {
    padding: "15px 0",
  },
  actionContainer: {
    position: "absolute",
    right: 0,
  },
}))

const ProductItem: React.FC<IProps> = ({product}) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [isProductDeleting, setIsProductDeleting] = useState(false)
  const [open, setOpen] = useState(false)
  // const handleDeleteClose = () => {
  //   setOpen(!open)
  // }
  const handleDeleteOpen = () => {
    setOpen(!open)
  }

  const handleEdit = () => {
    dispatch(setSelectedModal("manageProductModal"))
    dispatch(setSelectedProduct(product))
  }

  const handleDelete = async () => {
    try {
      setIsProductDeleting(true)
      const result = await dispatch(deleteProduct(product.id))
      unwrapResult(result)
      toast.success("Successfully product deleted")
    } catch (error) {
      toast.error("Sorry we were'nt able to delete this product right now. Please try again later.")
      setIsProductDeleting(false)
    }
  }

  return (
    <ListItem className={classes.productItem} disabled={isProductDeleting}>
      <ListItemText primary={product?.product_name} />
      <div className={classes.actionContainer}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleEdit}
          style={{marginRight: "1em"}}
        >
          <CreateIcon />
        </Button>
        <Button variant="contained" className={classes.button} onClick={handleDeleteOpen}>
          <DeleteIcon />
        </Button>
        <DeleteModal open={open} handleClose={handleDeleteOpen} handleDelete={handleDelete} />
      </div>
    </ListItem>
  )
}

export default ProductItem
