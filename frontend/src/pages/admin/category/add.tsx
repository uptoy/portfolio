import React, { useState } from 'react'
import SaveIcon from '@material-ui/icons/Save'
import { AdminLayout } from 'src/components/dashboard'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { categoryFormSchema } from 'src/yup/schema'
import { CategoryType } from 'src/yup/type'
import toast from 'react-hot-toast'
import { Button, Divider, TextField, Grid, Paper, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useRouter } from 'next/router'

const BaseURL = 'http://localhost:8080/api'

const useStyles = makeStyles(() => ({
  upload: {
    padding: '1em',
    borderWidth: 2,
    borderRadius: 5,
    outline: 'none',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'black',
    fontWeight: 'bold',
    width: '100%',
    minHeight: '10em',
    marginBottom: 30
  },
  uploadText: {
    margin: 0,
    paddingTop: 40,
    textAlign: 'center',
    fontSize: '1em'
  },
  show: {
    display: 'grid',
    gap: 15,
    gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))',
    width: '100%',
    marginTop: '1em'
  },
  cancel: {
    position: 'absolute',
    bottom: '88%',
    left: '78%',
    backgroundColor: 'white',
    borderRadius: '50%'
  },
  imageItem: {
    position: 'relative',
    width: '7em',
    height: '7em'
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 20
  },
  paper: {
    padding: 20,
    width: '50%',
    minWidth: '20em',
    margin: 'auto',
    marginBottom: '10em'
  },
  button: {
    marginTop: 10,
    marginLeft: 10
  },
  saveButton: {
    marginTop: 10,
    marginLeft: 10,
    width: '7em',
    height: '3.4em'
  },
  clear: {
    clear: 'both'
  }
}))

export default function CategoryAdd() {
  const classes = useStyles()
  return (
    <>
      <AdminLayout>
        <Paper className={classes.paper}>
          <h3 className={classes.title}>Category Add</h3>
          <Divider />
          <CategoryAddForm />
          <div className={classes.clear} />
        </Paper>
      </AdminLayout>
    </>
  )
}

const CategoryAddForm = () => {
  const classes = useStyles()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CategoryType>({
    resolver: yupResolver(categoryFormSchema)
  })

  const onSubmit = async (formData: CategoryType) => {
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
          <p>{errors.category_name?.message}</p>
        </Grid>
      </Grid>
      <div
        style={{
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
          className={classes.button}
          onClick={() => router.push('/admin/category')}
        >
          <ArrowBackIosIcon />
          <p style={{ margin: 5 }}>Back</p>
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.saveButton}
          disableElevation
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={25} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SaveIcon style={{ margin: 5 }} />
              <p style={{ margin: 5 }}>Save</p>
            </div>
          )}
        </Button>
      </div>
    </form>
  )
}
