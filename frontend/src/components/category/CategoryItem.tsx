import { makeStyles } from '@material-ui/styles'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteModal from 'src/components/modal/DeleteModal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Category } from 'src/@types'
import { Button, TableCell, TableRow } from '@material-ui/core'
import { useRouter } from 'next/router'
import getFormattedDate from 'src/utils/getFormattedDate'
import { BaseURL } from '@/common'

interface IProps {
  category: Category
  mutate(): void
}

const useStyles: any = makeStyles(() => ({
  actionContainer: {
    position: 'absolute',
    right: 0
  },
  cell: {
    padding: '10px'
  },
  button: {
    margin: '0.25em'
  }
}))

const CategoryItem: React.FC<IProps> = (props) => {
  const { category, mutate } = props
  const router = useRouter()
  const classes = useStyles()
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
      await fetch(`${BaseURL}/categories/${String(categoryId)}`, {
        method: 'DELETE',
        credentials: 'include'
      })
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
  const data = getFormattedDate(category.updated_at as any)
  console.log('data', data)

  return (
    <>
      <TableRow key={category.id}>
        <TableCell align="center" className={classes.cell} style={{ padding: 0 }}>
          {category.id}
        </TableCell>
        <TableCell style={{ width: '10%', paddingLeft: 35 }} className={classes.cell}>
          {category.category_name}
        </TableCell>
        <TableCell align="center" className={classes.cell}>
          {getFormattedDate(category.created_at)}
        </TableCell>
        <TableCell align="center" className={classes.cell}>
          {getFormattedDate(category.updated_at)}
        </TableCell>
        <TableCell align="center" className={classes.cell}>
          <Button variant="contained" className={classes.button} onClick={() => handleEdit(categoryId)}>
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

export default CategoryItem
