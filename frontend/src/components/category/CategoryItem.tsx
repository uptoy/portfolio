import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteModal from 'src/components/modal/DeleteModal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ICategory } from 'src/@types'
import { Button, TableCell, TableRow } from '@mui/material'
import { useRouter } from 'next/router'
import getFormattedDate from 'src/utils/getFormattedDate'
import { useDeleteCategory } from '@/hooks/fetcher'

interface IProps {
  category: ICategory
  mutate(): void
}

const CategoryItem: React.FC<IProps> = (props) => {
  const { category, mutate } = props
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleDeleteOpen = () => {
    setOpen(!open)
  }
  const categoryId = category.id as number

  const handleEdit = (categoryId: number) => {
    router.push(`/admin/category/edit/${String(categoryId)}`)
  }

  const handleDelete = async () => {
    console.log(String(categoryId))
    try {
      setIsSubmitting(true)
      await useDeleteCategory(categoryId)
      setIsSubmitting(false)
      toast.success('Success Delete Category')
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
  const data = getFormattedDate(category.updated_at as Date)
  console.log('data', data)

  return (
    <>
      <TableRow key={category.id}>
        <TableCell align="center" sx={{ padding: '10px' }} style={{ padding: 0 }}>
          {category.id}
        </TableCell>
        <TableCell style={{ width: '10%', paddingLeft: 35 }} sx={{ padding: '10px' }}>
          {category.category_name}
        </TableCell>
        <TableCell align="center" sx={{ padding: '10px' }}>
          {getFormattedDate(category.created_at)}
        </TableCell>
        <TableCell align="center" sx={{ padding: '10px' }}>
          {getFormattedDate(category.updated_at)}
        </TableCell>
        <TableCell align="center" sx={{ padding: '10px' }}>
          <Button variant="contained" sx={{ m: '0.25em' }} onClick={() => handleEdit(categoryId)}>
            <CreateIcon />
          </Button>
          <Button variant="contained" sx={{ m: '0.25em' }} onClick={handleDeleteOpen}>
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

export default CategoryItem
