import React, { useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import NextImage from 'next/image'
import SaveIcon from '@mui/icons-material/Save'
import { Category } from 'src/@types'
import { AdminLayout } from 'src/components/dashboard'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { productFormSchema } from 'src/yup/schema'
import { ProductType } from 'src/yup/type'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import {
  Box,
  Button,
  MenuItem,
  Divider,
  TextField,
  Grid,
  Paper,
  Select,
  CircularProgress,
  Typography
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useRouter } from 'next/router'
import CancelIcon from '@mui/icons-material/Cancel'
import { BaseURL, red500 } from '@/common'

// const useStyles: any = makeStyles(() => ({
//   upload: {
//     padding: '1em',
//     borderWidth: 2,
//     borderRadius: 5,
//     outline: 'none',
//     borderStyle: 'dashed',
//     backgroundColor: '#fafafa',
//     color: 'black',
//     fontWeight: 'bold',
//     width: '100%',
//     minHeight: '10em',
//     marginBottom: 30
//   },
//   uploadText: {
//     margin: 0,
//     paddingTop: 40,
//     textAlign: 'center',
//     fontSize: '1em'
//   },
//   show: {
//     display: 'grid',
//     gap: 15,
//     gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))',
//     width: '100%',
//     //     // padding: "1em 0",
//     marginTop: '1em'
//   },
//   cancel: {
//     position: 'absolute',
//     bottom: '88%',
//     left: '78%',
//     backgroundColor: 'white',
//     borderRadius: '50%'
//   },
//   imageItem: {
//     position: 'relative',
//     width: '7em',
//     height: '7em'
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 500,
//     marginBottom: 20
//   },
//   paper: {
//     padding: 20,
//     width: '50%',
//     minWidth: '20em',
//     margin: 'auto',
//     marginBottom: '10em'
//   },
//   button: {
//     marginTop: 10,
//     marginLeft: 10
//   },
//   saveButton: {
//     marginTop: 10,
//     marginLeft: 10,
//     width: '7em',
//     height: '3.4em'
//   },
//   clear: {
//     clear: 'both'
//   }
// }))

export default function ProductAdd() {
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
            Product Add
          </Typography>
          <Divider />
          <ProductAddForm />
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

export const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }).then((r) => r.json())

const ProductAddForm = () => {
  const { data } = useSWR(`${BaseURL}/category`, fetcher)
  const categories: Category[] = data?.data
  // const classes = useStyles()
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
  const [files, setFiles] = React.useState<ImageListType>([])
  const maxNumber = 5
  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    console.log(imageList, addUpdateIndex)
    setFiles(imageList)
  }

  const onSubmit = async (productData: any) => {
    const product_name = productData.product_name
    const str = productData.product_name
    const slug = str.replace(/[^0-9a-z]/gi, '')
    const brand = productData.brand
    const price = productData.price
    const count_in_stock = productData.count_in_stock
    const description = productData.description
    const category_id = productData.category_id
    try {
      setIsSubmitting(true)
      const formData: any = new FormData()
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
          <Typography variant="inherit" sx={{ margin: 5 }}>
            {errors.product_name?.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" required fullWidth id="brand" label="brand" {...register('brand')} />
          <Typography variant="inherit" sx={{ margin: 5 }}>
            {errors.brand?.message}
          </Typography>
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
              <Box component="div" className="upload__image-wrapper">
                <Box
                  component="div"
                  sx={{
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
                  }}
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <Typography
                    variant="inherit"
                    sx={{
                      margin: 0,
                      paddingTop: 40,
                      textAlign: 'center',
                      fontSize: '1em'
                    }}
                  >
                    Click or Drop here
                  </Typography>
                </Box>

                <Box
                  component="div"
                  sx={{
                    display: 'grid',
                    gap: 15,
                    gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))',
                    width: '100%',
                    //     // padding: "1em 0",
                    marginTop: '1em'
                  }}
                >
                  {imageList.map((image, index) => (
                    <Box
                      component="div"
                      key={index}
                      sx={{
                        position: 'relative',
                        width: '7em',
                        height: '7em'
                      }}
                    >
                      <NextImage src={image['data_url']} height={100} width={100} />
                      <CancelIcon
                        sx={{
                          position: 'absolute',
                          bottom: '88%',
                          left: '78%',
                          backgroundColor: 'white',
                          borderRadius: '50%'
                        }}
                        onClick={() => onImageRemove(index)}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </ImageUploading>
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
          sx={{
            marginTop: 10,
            marginLeft: 10
          }}
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
