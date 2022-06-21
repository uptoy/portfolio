import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Rating from 'src/components/Rating'
import { ReviewType } from 'src/yup/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { reviewFormSchema } from 'src/yup/schema'
import { Link, Button, MenuItem, TextField } from '@material-ui/core'
import { Review } from 'src/@types'
import { useAuth } from 'src/context/AuthContext'
import toast from 'react-hot-toast'
import getFormattedDate from 'src/utils/getFormattedDate'
import { BaseURL } from '@/common'

interface IProps {
  reviews: Review[]
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
    <div style={{ paddingTop: 15 }}>
      <Button variant="contained" style={{ marginTop: '1em' }} onClick={handleClick2}>
        {state2 ? <div>Close Review List</div> : <div>Open Review List</div>}
      </Button>
      {state2 ? (
        <div>
          <div>
            {reviews ? (
              <div>
                <h2>Reviews({reviews.length})</h2>
                {reviews.map((review) => (
                  <div key={review.id} style={{ margin: 10, marginLeft: 0 }}>
                    <Rating value={review.rating} />
                    <p style={{ margin: 0 }}>{getFormattedDate(review.updated_at)}</p>
                    <div>
                      <strong>Title: </strong>
                      {review.title}
                    </div>
                    <div>
                      <strong>Comment: </strong>
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '1em' }}>
                <h4>No Reviews</h4>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 10 }}>Do you want look review?</div>
      )}
      <Button variant="contained" style={{ marginTop: '1em' }} onClick={handleClick}>
        {state ? <div>Review Form Close</div> : <div>Write Review</div>}
      </Button>
      {state && (
        <div>
          {isAuthenticated ? (
            <ProductReviewForm productId={productId} />
          ) : (
            <div style={{ marginTop: 10 }}>
              <span>Please</span>
              <Link href="/auth/signin" style={{ margin: 5 }}>
                sign in
              </Link>
              <span>to write a review</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductReview

const ProductReviewForm: React.FC<ReviewFormIProps> = ({ productId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit
  } = useForm<ReviewType>({
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
          style={{ width: '15vh' }}
        >
          {ratings.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div>
          <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 3 }}>
            submit
          </Button>
        </div>
      </form>
    </>
  )
}
