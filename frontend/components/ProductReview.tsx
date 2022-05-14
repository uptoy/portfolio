import React, {useState} from "react"
import {ErrorMessage} from "components/message"
import {SubmitHandler, useForm, Controller} from "react-hook-form"
import Rating from "components/Rating"
import {ReviewType} from "yup/type"
import {yupResolver} from "@hookform/resolvers/yup"
import {reviewFormSchema} from "yup/schema"
import {Link, Button, MenuItem, TextField} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import {Review} from "@types"
import {useAuth} from "context/AuthContext"

const useStyles: any = makeStyles(() => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1, 0),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: "#fff",
  },
  button: {
    marginTop: "1em",
  },
  select: {
    marginBottom: "0.5em",
  },
}))
interface IProps {
  reviews: Review[]
}

const ratings = [
  {
    value: 1,
    label: "1 - Poor",
  },
  {
    value: 2,
    label: "2 - Fair",
  },
  {
    value: 3,
    label: "3 - Good",
  },
  {
    value: 4,
    label: "4 - Very Good",
  },
  {
    value: 5,
    label: "5 - Excellent",
  },
]

const ProductReview: React.VFC<IProps> = ({reviews}) => {
  const [state, setState] = useState(false)
  const [state2, setState2] = useState(false)
  const {isAuthenticated} = useAuth()
  function handleClick(e: any) {
    setState(!state)
  }
  const handleClick2: React.MouseEventHandler<HTMLButtonElement> = () => {
    setState2(!state2)
  }
  return (
    <>
      <Button variant="contained" style={{marginTop: "1em"}} onClick={handleClick2}>
        {state2 ? <p>Close Review List</p> : <p>Open Review List</p>}
      </Button>
      {state2 ? (
        <div>
          <div>
            {reviews ? (
              <div>
                <h2>Reviews({reviews.length})</h2>
                {reviews.map((review) => (
                  <div key={review.id}>
                    <p>{review.created_at}</p>
                    <Rating value={review.rating} />
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
              <div style={{padding: "1em"}}>
                <h4>No Reviews</h4>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Do you want look review?</div>
      )}
      <Button variant="contained" style={{marginTop: "1em"}} onClick={handleClick}>
        {state ? <p>Review Form Close</p> : <p>Write Review</p>}
      </Button>
      {state && (
        <div>
          {isAuthenticated ? (
            <ProductReviewForm />
          ) : (
            <>
              <span>Please</span>
              <Link href="/auth/signin" style={{margin: 5}}>
                sign in
              </Link>
              <span>to write a review</span>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default ProductReview

const ProductReviewForm = () => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<ReviewType>({
    resolver: yupResolver(reviewFormSchema),
  })
  const onSubmit: SubmitHandler<ReviewType> = async (formData) => {
    console.log("formData", formData)
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
          {...register("title")}
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
          {...register("comment")}
        />
        <TextField
          select
          defaultValue={1}
          variant="outlined"
          margin="normal"
          required
          label="Rating"
          id="rating"
          {...register("rating")}
          style={{width: "15vh"}}
        >
          {ratings.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div>
          <Button type="submit" variant="contained" sx={{mt: 3}}>
            submit
          </Button>
        </div>
      </form>
    </>
  )
}
