import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Rating from 'src/components/Rating'
import { ReviewType } from 'src/yup/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { reviewFormSchema } from 'src/yup/schema'
import { Link, Button, MenuItem, TextField, Box, Typography } from '@mui/material'
import { IReview } from 'src/@types'
import { useAuth } from 'src/context/AuthContext'
import toast from 'react-hot-toast'
import getFormattedDate from 'src/utils/getFormattedDate'
import { BaseURL } from '@/common'

interface IProps {
  reviews: IReview[]
  productId: string
}

interface ReviewFormIProps {
  productId: string
}

const ratings = [
  {
    value: 1,
    label: '1 - Poor'
  },
  {
    value: 2,
    label: '2 - Fair'
  },
  {
    value: 3,
    label: '3 - Good'
  },
  {
    value: 4,
    label: '4 - Very Good'
  },
  {
    value: 5,
    label: '5 - Excellent'
  }
]

const ProductReview: React.FC<IProps> = ({ reviews, productId }) => {
  const [state, setState] = useState(false)
  const [state2, setState2] = useState(true)
  const { isAuthenticated } = useAuth()
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setState(!state)
  }
  const handleClick2: React.MouseEventHandler<HTMLButtonElement> = () => {
    setState2(!state2)
  }
  return (
    <Box component="div" sx={{ paddingTop: 15 }}>
      <Button variant="contained" sx={{ marginTop: '1em' }} onClick={handleClick2}>
        {state2 ? <Box component="div">Close Review List</Box> : <Box component="div">Open Review List</Box>}
      </Button>
      {state2 ? (
        <Box component="div">
          <Box component="div">
            {reviews ? (
              <Box component="div">
                <h2>Reviews({reviews.length})</h2>
                {reviews.map((review) => (
                  <Box component="div" key={review.id} sx={{ margin: 10, marginLeft: 0 }}>
                    <Rating value={review.rating} />
                    <Typography variant="inherit" sx={{ margin: 0 }}>
                      {getFormattedDate(review.updated_at)}
                    </Typography>
                    <Box component="div">
                      <strong>Title: </strong>
                      {review.title}
                    </Box>
                    <Box component="div">
                      <strong>Comment: </strong>
                      {review.comment}
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box component="div" sx={{ padding: '1em' }}>
                <h4>No Reviews</h4>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box component="div" sx={{ marginTop: 10 }}>
          Do you want look review?
        </Box>
      )}
      <Button variant="contained" sx={{ marginTop: '1em' }} onClick={handleClick}>
        {state ? <Box component="div">Review Form Close</Box> : <Box component="div">Write Review</Box>}
      </Button>
      {state && (
        <Box component="div">
          {isAuthenticated ? (
            <ProductReviewForm productId={productId} />
          ) : (
            <Box component="div" sx={{ marginTop: 10 }}>
              <span>Please</span>
              <Link href="/auth/signin" sx={{ margin: 5 }}>
                sign in
              </Link>
              <span>to write a review</span>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default ProductReview

const ProductReviewForm: React.FC<ReviewFormIProps> = ({ productId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit } = useForm<ReviewType>({
    resolver: yupResolver(reviewFormSchema)
  })
  const onSubmit: SubmitHandler<ReviewType> = async (formData) => {
    try {
      setIsSubmitting(true)
      await fetch(`${BaseURL}/products/${productId}/reviews`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      setIsSubmitting(false)
      toast.success('Create Review')
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
      <h2>Write a Customer Review</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          placeholder="Write a title"
          required
          fullWidth
          label="Title"
          id="title"
          {...register('title')}
        />
        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          placeholder="Write a comment"
          required
          fullWidth
          label="Comment"
          id="comment"
          {...register('comment')}
        />
        <TextField
          select
          defaultValue={1}
          variant="outlined"
          margin="normal"
          required
          label="Rating"
          id="rating"
          {...register('rating')}
          sx={{ width: '15vh' }}
        >
          {ratings.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box component="div">
          <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 3 }}>
            submit
          </Button>
        </Box>
      </form>
    </>
  )
}
