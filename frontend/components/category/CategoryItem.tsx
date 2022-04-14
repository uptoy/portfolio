import {ListItem, ListItemText} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete"
import DeleteModal from "components/Modal/DeleteModal"
import {Button} from "@material-ui/core"
import {unwrapResult} from "@reduxjs/toolkit"
import {useState} from "react"
import toast from "react-hot-toast"
import {
  deleteCategory,
  setSelectedCategory,
  setSelectedModal,
} from "features/category/categorySlice"
import {Category} from "types"
import {useAppDispatch} from "app/hooks"

interface IProps {
  category: Category
}

const useStyles: any = makeStyles(() => ({
  categoryItem: {
    padding: "15px 0",
  },
  actionContainer: {
    position: "absolute",
    right: 0,
  },
}))

const CategoryItem: React.FC<IProps> = ({category}) => {
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const [isCategoryDeleting, setIsCategoryDeleting] = useState(false)

  const [open, setOpen] = useState(false)
  const handleDeleteClose = () => {
    setOpen(false)
  }
  const handleDeleteOpen = () => {
    setOpen(true)
  }

  const handleEdit = () => {
    dispatch(setSelectedModal("manageCategoryModal"))
    dispatch(setSelectedCategory(category))
  }

  const handleDelete = async () => {
    try {
      setIsCategoryDeleting(true)
      const result = await dispatch(deleteCategory(category.id))
      unwrapResult(result)
      toast.success("Successfully category deleted")
    } catch (error) {
      toast.error(
        "Sorry we were'nt able to delete this category right now. Please try again later."
      )
      setIsCategoryDeleting(false)
    }
  }

  return (
    <ListItem className={classes.categoryItem} disabled={isCategoryDeleting}>
      <ListItemText primary={category?.category_name} />
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
        <DeleteModal open={open} handleClose={handleDeleteClose} handleDelete={handleDelete} />
      </div>
    </ListItem>
  )
}

export default CategoryItem
