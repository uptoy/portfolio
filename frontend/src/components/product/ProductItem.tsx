// import { makeStyles } from '@material-ui/styles'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteModal from 'src/components/modal/DeleteModal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IProduct } from 'src/@types'
import { Button, TableCell, TableRow } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BaseURL } from '@/common'

interface IProps {
  product: IProduct
  mutate(): void
}

const ProductItem: React.FC<IProps> = (props) => {
  const { product, mutate } = props
  const router = useRouter()
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
        method: 'DELETE',
        credentials: 'include'
      })
      setIsSubmitting(false)
      toast.success('Success Delete Product')
      mutate()
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log('Failed', err.message)
        throw new Error(err.message)
      } else {
        console.log('Unknown Failure', err)
        throw new Error('Unknown Failure')
      }
    }
  }

  return (
    <>
      <TableRow key={product.id}>
        <TableCell align="center" style={{ padding: '10px' }}>
          {product.id}
        </TableCell>
        <TableCell style={{ width: '10%', padding: '10px' }}>
          <Image src="http://placehold.jp/100x100.png" width={100} height={100} alt="My avatar" />
        </TableCell>
        <TableCell style={{ padding: '10px' }}>{product.product_name}</TableCell>
        <TableCell align="center" style={{ padding: '10px' }}>
          {product.category_id}
        </TableCell>
        <TableCell align="center" style={{ padding: '10px' }}>
          {product.price}
        </TableCell>
        <TableCell style={{ padding: '10px' }}>{product.brand}</TableCell>
        <TableCell align="center" style={{ padding: '10px' }}>
          {product.count_in_stock}
        </TableCell>
        <TableCell align="center" style={{ padding: '10px' }}>
          <Button variant="contained" style={{ margin: '0.25em' }} onClick={() => handleEdit(productId)}>
            <CreateIcon />
          </Button>
          <Button variant="contained" style={{ margin: '0.25em' }} onClick={handleDeleteOpen}>
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
