import React, { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import { AdminLayout } from 'src/components/dashboard'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { categoryFormSchema } from 'src/yup/schema'
import { CategoryType } from 'src/yup/type'
import toast from 'react-hot-toast'
import { Button, Divider, TextField, Grid, Paper, CircularProgress, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useRouter } from 'next/router'
import { BaseURL } from '@/common'
import { Box } from '@mui/material'


export default function CategoryAdd() {
  // const classes = useStyles()
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
            Category Add
          </Typography>
          <Divider />
          <CategoryAddForm />
          <Box
            component="div"
            sx={{
              clear: 'both'
            }}
          />
        </Paper>
      </AdminLayout>
    </>
  )
}

const CategoryAddForm = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CategoryType>({
    resolver: yupResolver(categoryFormSchema)
  })

  const onSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true)
      await fetch(`${BaseURL}/categories`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      setIsSubmitting(false)
      toast.success('Create Category')
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
          sx={{
            marginTop: 10,
            marginLeft: 10
          }}
          onClick={() => router.push('/admin/category')}
        >
          <ArrowBackIosIcon />
          <p style={{ margin: 5 }}>Back</p>
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
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
              <Typography variant="inherit">Save</Typography>
            </Box>
          )}
        </Button>
      </Box>
    </form>
  )
}
