import React, { useState, useEffect } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import { yupResolver } from '@hookform/resolvers/yup'
import { productFormSchema } from 'src/yup/schema'
import { AdminLayout } from 'src/components/dashboard'
import { ProductType } from 'src/yup/type'
import { useForm, Controller } from 'react-hook-form'
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
import { IProduct } from 'src/@types'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import NextImage from 'next/image'
import ImageUploading from 'react-images-uploading'
import CancelIcon from '@mui/icons-material/Cancel'
import { BaseURL } from '@/common'
import { useGetCategories, useGetProduct } from '@/hooks/fetcher'

interface ProductManageFormProps {
  id?: string
  fields?: IProduct
}

export default function ProductEdit() {
  const router = useRouter()
  const id = router.query.id as string
  const { data: product, error } = useGetProduct(id)
  if (error) return <div>failed to load</div>
  if (!product) return <div>loading...</div>
  const product_name = product.product_name
  const slug = product.slug
  const brand = product.brand
  const price = product.price
  const category_id = product.category_id
  const count_in_stock = product.count_in_stock
  const description = product.description
  const category = product.category!
  const images = product.images!
  const fields: IProduct = {
    product_name: product_name,
    slug: slug,
    brand: brand,
    price: price,
    category_id: category_id,
    count_in_stock: count_in_stock,
    description: description,
    category: category,
    images: images
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
            Product Edit
          </Typography>
          <Divider />
          <ProductEditForm id={id} fields={fields} />
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

const ProductEditForm = ({ id, fields }: ProductManageFormProps) => {
  const router = useRouter()
  const [files, setFiles] = useState<any>('')
  const maxNumber = 5
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm<ProductType>({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      category_id: 1
    }
  })
  const images = fields?.images
  console.log('iamges', images)
  const { data: categories, error } = useGetCategories()
  if (error) return <div>failed to load</div>
  if (!categories) {
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const onChange = (imageList: any, addUpdateIndex: any) => {
    console.log(imageList, addUpdateIndex)
    setFiles(imageList)
  }
  useEffect(() => {
    if (fields) {
      setValue('product_name', fields.product_name)
      setValue('slug', fields.slug)
      setValue('brand', fields.brand)
      setValue('price', fields.price)
      setValue('category_id', fields.category_id)
      setValue('count_in_stock', fields.count_in_stock)
      setValue('description', fields.description)
    }
  }, [fields, setValue])
  const onSubmit = async (productData: ProductType) => {
    const product_name = productData.product_name!
    const str = productData.product_name!
    const slug = str?.replace(/[^0-9a-z]/gi, '')
    const brand = productData.brand!
    const price = String(productData.price)
    const count_in_stock = String(productData.count_in_stock)
    const description = productData.description!
    const category_id = String(productData.category_id)
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
        formData.append(`files`, files[i])
      }
      await fetch(`${BaseURL}/products/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData
      })
      setIsSubmitting(false)
      toast.success('Success Edit Product')
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
          <Controller
            name="product_name"
            control={control}
            defaultValue=""
            rules={{
              required: 'Title is required field'
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                onChange={onChange}
                value={value}
                fullWidth
                id="product_name"
                label="product name"
                name="product_name"
                autoComplete="true"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="brand"
            control={control}
            defaultValue=""
            rules={{
              required: 'Title is required field'
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                onChange={onChange}
                value={value}
                fullWidth
                id="brand"
                label="brand"
                name="brand"
                autoComplete="true"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="price"
            control={control}
            defaultValue={1}
            rules={{
              required: 'Title is required field'
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                onChange={onChange}
                value={value}
                fullWidth
                id="price"
                label="price"
                name="price"
                autoComplete="true"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <Select {...field} required style={{ width: '100%' }}>
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="count_in_stock"
            control={control}
            defaultValue={1}
            rules={{
              required: 'Title is required field'
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                onChange={onChange}
                value={value}
                fullWidth
                id="count_in_stock"
                label="count_in_stock"
                name="count_in_stock"
                autoComplete="true"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              required: 'Title is required field'
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="normal"
                onChange={onChange}
                value={value}
                fullWidth
                id="description"
                label="description"
                name="description"
                autoComplete="true"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
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
                    gap: 30,
                    gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))',
                    width: '100%',
                    marginTop: '0.2em'
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
