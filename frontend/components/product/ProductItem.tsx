import {makeStyles} from "@material-ui/styles"
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete"
import DeleteModal from "components/modal/DeleteModal"
import {unwrapResult} from "@reduxjs/toolkit"
import {useState} from "react"
import toast from "react-hot-toast"
import {deleteProduct, setSelectedProduct, setSelectedModal} from "features/product/productSlice"
import {Product} from "@types"
import {useAppDispatch} from "app/hooks"
import {Button, TableCell, TableRow} from "@material-ui/core"
import Image from "next/image"
import {useRouter} from "next/router"
import Link from "components/Link"

interface IProps {
  product: Product
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

const ProductItem: React.FC<IProps> = ({product}) => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const handleDeleteOpen = () => {
    setOpen(!open)
  }

  const handleEdit = () => {
    router.push("/admin/product/edit")
  }

  const handleDelete = async () => {
    try {
      const result = await dispatch(deleteProduct(product.id as number))
      unwrapResult(result)
      toast.success("Successfully product deleted")
    } catch (error) {
      toast.error("Sorry we were'nt able to delete this product right now. Please try again later.")
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
          <Link href={`/admin/product/edit/${product.id}`}>
            <Button variant="contained" className={classes.button}>
              <CreateIcon />
            </Button>
          </Link>
          <Button variant="contained" className={classes.button} onClick={handleDeleteOpen}>
            <DeleteIcon />
          </Button>
          <DeleteModal open={open} handleClose={handleDeleteOpen} handleDelete={handleDelete} />
        </TableCell>
      </TableRow>
    </>
  )
}

export default ProductItem
