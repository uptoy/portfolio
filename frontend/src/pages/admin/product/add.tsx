import React, { useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import NextImage from 'next/image'
import SaveIcon from '@material-ui/icons/Save'
import { Category, Product } from 'src/@types'
import { AdminLayout } from 'src/components/dashboard'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { productFormSchema } from 'src/yup/schema'
import { ProductType } from 'src/yup/type'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { Button, MenuItem, Divider, TextField, Grid, Paper, Select, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useRouter } from 'next/router'
import { red } from '@material-ui/core/colors'
import CancelIcon from '@material-ui/icons/Cancel'

const red500 = red['500']
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
    //     // padding: "1em 0",
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

export default function ProductAdd() {
  const classes = useStyles()
  return (
    <>
      <AdminLayout>
        <Paper className={classes.paper}>
          <h3 className={classes.title}>Product Add</h3>
          <Divider />
          <ProductAddForm />
          <div className={classes.clear} />
        </Paper>
      </AdminLayout>
    </>
  )
}

export const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }).then((r) => r.json())

const ProductAddForm = () => {
  const { data } = useSWR(`${BaseURL}/category`, fetcher)
  const categories: Category[] = data?.data
  const classes = useStyles()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ProductType>({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      category_id: 1
    }
  })
  interface IFile {
    data_url: string
    file: File
  }
  const [files, setFiles] = React.useState<ImageListType>([])
  const maxNumber = 5
  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    console.log(imageList, addUpdateIndex)
    setFiles(imageList)
  }

  const onSubmit = async (productData: ProductType) => {
    const product_name = productData.product_name
    const slug = product_name ? product_name.replace(/[^0-9a-z]/gi, '') : ''
    const brand = productData.brand
    const price = productData.price
    const count_in_stock = productData.count_in_stock
    const description = productData.description
    const category_id = productData.category_id
    try {
      setIsSubmitting(true)
      const formData = new FormData()
      formData.append('product_name', product_name)
      formData.append('slug', slug)
      formData.append('brand', brand)
      formData.append('price', price)
      formData.append('count_in_stock', count_in_stock)
      formData.append('description', description)
      formData.append('category_id', category_id)
      for (let i = 0; i < files.length; i++) {
        formData.append(`files`, files[i].file)
      }
      await fetch(`${BaseURL}/products`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      })
      setIsSubmitting(false)
      toast.success('Create Product')
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
          <TextField variant="outlined" required fullWidth label="name" {...register('product_name')} />
          <p>{errors.product_name?.message}</p>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" required fullWidth id="brand" label="brand" {...register('brand')} />
          <p>{errors.brand?.message}</p>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" required fullWidth label="price" {...register('price')} />
          <p style={{ color: red500 }}>{errors.price?.message}</p>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <Select {...field} required style={{ width: '100%' }}>
                {categories?.map((category: Category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" required fullWidth label="count_in_stock" {...register('count_in_stock')} />
          <p style={{ color: red500 }}>{errors.count_in_stock?.message}</p>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" required fullWidth label="description" {...register('description')} />
          <p style={{ color: red500 }}>{errors.count_in_stock?.message}</p>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '1em' }}>
          <ImageUploading multiple value={files} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
            {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <div
                  className={classes.upload}
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <p className={classes.uploadText}>Click or Drop here</p>
                </div>

                <div className={classes.show}>
                  {imageList.map((image, index) => (
                    <div key={index} className={classes.imageItem}>
                      <NextImage src={image['data_url']} height={100} width={100} />
                      <CancelIcon className={classes.cancel} onClick={() => onImageRemove(index)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
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
          onClick={() => router.push('/admin/product')}
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
