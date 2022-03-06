import React, { useState } from "react"
import { ErrorMessage } from "components/Message/ErrorMessage"
import Rating from "components/Rating"
import {
  Link,
  Select,
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  InputLabel,
  TextField,
  CircularProgress,
  Typography,
} from "@material-ui/core"
import theme from "theme"
const useStyles: any = makeStyles(() => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: "#fff",
  },
}))

const ProductReview = ({ productId }: any) => {
  const [initialLoading, setInitialLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [rating, setRating] = useState("")

  const classes = useStyles()

  // const productReviewsData = useSelector((state) => state.productReview)
  // const reviewResponses = useSelector((state) => state.createReview)

  // const { success: createReviewSuccess, loading: createReviewLoading } = reviewResponses

  // const userAuthData = useSelector((state) => state.userLogin)

  // const { userInfo } = userAuthData

  // const { loading, productReviews, count, error, success } = productReviewsData

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   if (createReviewSuccess) {
  //     setTitle("")
  //     setText("")
  //     setRating("")
  //     dispatch({ type: productConstants.CREATE_REVIEW_RESET })
  //   }

  //   dispatch(productAction.productReviews(productId, initialLoading))

  //   // eslint-disable-next-line
  // }, [dispatch, createReviewSuccess])

  // useEffect(() => {
  //   if (success && initialLoading) {
  //     setInitialLoading(false)
  //   }
  //   // eslint-disable-next-line
  // }, [dispatch, success])

  // const handleCreateReview = (e) => {
  //   e.preventDefault()

  //   dispatch(productAction.createReview(productId, title, text, rating))
  // }
  const loading = true
  const error = true
  const count = 1

  const user1 = {
    _id: "_id",
    name: "name",
  }
  const review1 = {
    _id: "_id",
    userId: user1,
    rating: 4,
    createdAt: "createdAt",
    text: "text",
  }
  const review2 = {
    _id: "_id",
    userId: user1,
    rating: 4,
    createdAt: "createdAt",
    text: "text",
  }
  const productReviews = [review1, review2]
  const product = {
    averageRating: 1,
    Reviews: productReviews,
  }
  const createReviewLoading = true
  const userInfo = true

  return loading ? (
    <p>Loding....</p>
  ) : error ? (
    <ErrorMessage header={"Something went wrong"} message={error} />
  ) : (
    <>
      <h2>Reviews({count})</h2>
      {!productReviews.length && <h4>No Reviews</h4>}
      <div>
        {productReviews.map((review) => (
          <div key={review._id}>
            <strong>{review.userId.name}</strong>

            <Rating
              color={"primary"}
              value={product.averageRating}
              text={`${product.Reviews ? product.Reviews.length : 0} reviews`}
            />
            <p>{review.createdAt.substring(0, 10)}</p>
            <p>{review.text}</p>
          </div>
        ))}
        <h2>Write a Customer Review</h2>

        {userInfo ? (
          <form>
            <TextField
              variant="outlined"
              type="text"
              margin="normal"
              placeholder="Write a title"
              required
              fullWidth
              id="title"
              label="Write a title"
              name="title"
              autoComplete="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              variant="outlined"
              type="text"
              margin="normal"
              placeholder="Write a comment"
              required
              fullWidth
              id="comment"
              label="Write a comment"
              name="comment"
              autoComplete="comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Rating</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => setRating(e.target.value)}
                label="Rating"
                autoWidth
                value={rating}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="1">1 - Poor</MenuItem>
                <MenuItem value="2">2 - Fair</MenuItem>
                <MenuItem value="3">3 - Good</MenuItem>
                <MenuItem value="4">4 - Very Good</MenuItem>
                <MenuItem value="5">5 - Excellent</MenuItem>
              </Select>
            </FormControl>
            <div className="my-3">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={createReviewLoading}
              >
                {createReviewLoading ? (
                  <CircularProgress color="inherit" className={classes.prgressColor} />
                ) : (
                  <>Submit</>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <>
            <Typography>Please</Typography>
            <Link href="#" onClick={() => {}}>
              sign in
            </Link>
            <Typography>to write a review</Typography>
          </>
        )}
      </div>
    </>
  )
}

export default ProductReview
