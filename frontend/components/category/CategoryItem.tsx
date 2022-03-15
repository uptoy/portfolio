import IconButton from "@material-ui/core/IconButton"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import {makeStyles} from "@material-ui/styles"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete"
import {CustomerManageModal} from "components/Customer"
import DeleteModal from "components/Modal/DeleteModal"
import {Button} from "@material-ui/core"
// import { unwrapResult } from "@reduxjs/toolkit"
import {useState} from "react"
import toast from "react-hot-toast"

// import { deleteCategory, setSelectedCategory, setSelectedModal } from '../../slice';
import {ICategory} from "types"

// import { useAppDispatch, useAppSelector } from 'app/hooks';

interface IProps {
  category: ICategory
  open: boolean
  open1: boolean
  handleOpen(): void
  handleDeleteOpen(): void
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

const CategoryItem = (props: IProps) => {
  const classes = useStyles()

  // const { user } = useAppSelector((state) => state.auth)

  // const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [isCategoryDeleting, setIsCategoryDeleting] = useState(false)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    // dispatch(setSelectedModal("manageCategoryModal"))
    // dispatch(setSelectedCategory(category))
    handleCloseMenu()
  }

  const handleDelete = async () => {
    try {
      setIsCategoryDeleting(true)
      // const result = await dispatch(deleteCategory(category.id))
      // unwrapResult(result)
      toast.success("Successfully category deleted")
      handleCloseMenu()
    } catch (error) {
      toast.error(
        "Sorry we were'nt able to delete this category right now. Please try again later."
      )
      setIsCategoryDeleting(false)
    }
  }

  // const canShowMenu = () => {
  //   return user?.id === category.user_id
  // }

  return (
    <ListItem className={classes.categoryItem} disabled={isCategoryDeleting}>
      <ListItemText primary={props.category.title} />

      <div className={classes.actionContainer}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={props.handleOpen}
          style={{marginRight: "1em"}}
        >
          <CreateIcon />
        </Button>
        <Button variant="contained" className={classes.button} onClick={props.handleDeleteOpen}>
          <DeleteIcon />
        </Button>
      </div>
    </ListItem>
  )
}

export default CategoryItem
