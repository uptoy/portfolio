import CircularProgress from "@material-ui/core/CircularProgress"
import {makeStyles} from "@material-ui/styles"
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete"
import DeleteModal from "components/modal/DeleteModal"
import {useState} from "react"
import toast from "react-hot-toast"
import {Product} from "@types"
import {useAppDispatch} from "app/hooks"
import {Button, TableCell, TableRow} from "@material-ui/core"
import Image from "next/image"
import {useRouter} from "next/router"
import {mutate} from "swr"
const BaseURL = "http://localhost:8080/api"

interface IProps {
  product: Product
  mutate(): void
}

const useStyles: any = makeStyles(() => ({
  actionContainer: {
    position: "absolute",
    right: 0,
  },
  cell: {
    padding: "10px",
  },
  button: {
    margin: "0.25em",
  },
}))

const ProductItem: React.FC<IProps> = (props) => {
  const {product, mutate} = props
  const router = useRouter()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleDeleteOpen = () => {
    setOpen(!open)
  }
  const productId = product.id as number

  const handleEdit = (productId: number) => {
    router.push(`/admin/product/edit/${String(productId)}`)
  }

  const handleDelete = async () => {
    console.log(String(productId))
    try {
      setIsSubmitting(true)
      await fetch(`${BaseURL}/products/${String(productId)}`, {
        method: "DELETE",
        credentials: "include",
      })
      setIsSubmitting(false)
      toast.success("Success Delete Product")
      mutate()
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
    <>
      <TableRow key={product.id}>
        <TableCell style={{width: "10%"}} className={classes.cell}>
          <Image src="http://placehold.jp/100x100.png" width={100} height={100} alt="My avatar" />
        </TableCell>
        <TableCell className={classes.cell}>{product.product_name}</TableCell>
        <TableCell align="center" className={classes.cell}>
          {product.category_id}
        </TableCell>
        <TableCell align="center" className={classes.cell}>
          {product.price}
        </TableCell>
        <TableCell className={classes.cell}>{product.brand}</TableCell>
        <TableCell align="center" className={classes.cell}>
          {product.count_in_stock}
        </TableCell>
        <TableCell align="center" className={classes.cell}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => handleEdit(productId)}
          >
            <CreateIcon />
          </Button>
          <Button variant="contained" className={classes.button} onClick={handleDeleteOpen}>
            <DeleteIcon />
          </Button>
        </TableCell>
      </TableRow>
      <DeleteModal
        open={open}
        handleClose={handleDeleteOpen}
        handleDelete={() => handleDelete()}
        isSubmitting={isSubmitting}
      />
    </>
  )
}

export default ProductItem
