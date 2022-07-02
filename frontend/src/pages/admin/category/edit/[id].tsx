import React, { useState, useEffect } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import { Category } from 'src/@types'
import { AdminLayout } from 'src/components/dashboard'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { categoryFormSchema } from 'src/yup/schema'
import { CategoryType } from 'src/yup/type'
import toast from 'react-hot-toast'
import { Box, Button, Divider, TextField, Grid, Paper, CircularProgress, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useRouter } from 'next/router'
import { fetcher } from 'src/pages/admin/product/add'
import useSWR from 'swr'
import { BaseURL } from '@/common'


export interface ManageCategoryFields {
  id?: number
  category_name: string
  created_at: Date
  updated_at: Date
}

// interface FormData {
//   product_name: string
//   slug: string
//   brand: string
//   price: number
//   category_id: number
//   count_in_stock: number
//   description: string
// }

interface CategoryManageFormProps {
  id?: string
  fields?: ManageCategoryFields
}

export default function CategoryEdit() {
  const router = useRouter()
  const id = router.query.id as string
  const { data, error } = useSWR(`${BaseURL}/categories/${id}`, fetcher)
  const category: Category = data?.data
  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <Box
        component="div"
        sx={{
          textAlign: 'center',
          margin: '100px 0'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }
  const fields: ManageCategoryFields = {
    category_name: category?.category_name,
    created_at: category?.created_at,
    updated_at: category?.updated_at
  }
  return (
    <>
      <AdminLayout>
        <Paper
          sx={{
            padding: 20,
            width: '50%',
            minWidth: '20em',
            margin: 'auto',
            marginBottom: '10em'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: 24,
              fontWeight: 500,
              marginBottom: 20
            }}
          >
            Category Edit
          </Typography>
          <Divider />
          <CategoryEditForm id={id} fields={fields} />
          <Box component="div" sx={{ textAlign: 'center', margin: '100px 0' }}></Box>
        </Paper>
      </AdminLayout>
    </>
  )
}

const CategoryEditForm = ({ id, fields }: CategoryManageFormProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<CategoryType>({
    resolver: yupResolver(categoryFormSchema)
  })
  useEffect(() => {
    if (fields) {
      setValue('category_name', fields.category_name)
      setValue('created_at', fields.created_at)
      setValue('updated_at', fields.updated_at)
    }
  }, [fields, setValue])

  const onSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true)
      await fetch(`${BaseURL}/categories/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      setIsSubmitting(false)
      toast.success('Edit Category')
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField variant="outlined" required fullWidth label="category" {...register('category_name')} />
          <Typography variant="inherit">{errors.category_name?.message}</Typography>
        </Grid>
      </Grid>
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          marginTop: 20
        }}
      >
        <Button
          type="button"
          variant="contained"
          color="primary"
          style={{ marginTop: 10, marginLeft: 10 }}
          onClick={() => router.push('/admin/product')}
        >
          <ArrowBackIosIcon />
          <Typography variant="inherit" sx={{ margin: 5 }}>
            Back
          </Typography>
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            marginTop: 10,
            marginLeft: 10,
            width: '7em',
            height: '3.4em'
          }}
          disableElevation
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={25} />
          ) : (
            <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <SaveIcon style={{ margin: 5 }} />
              <Typography variant="inherit" sx={{ margin: 5 }}>
                Save
              </Typography>
            </Box>
          )}
        </Button>
      </Box>
    </form>
  )
}

