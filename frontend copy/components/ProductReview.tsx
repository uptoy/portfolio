import React, {useState} from "react"
import {ErrorMessage} from "components/message"
import Rating from "components/Rating"
import {
  Link,
  Select,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
  CircularProgress,
  Typography,
} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import {Review} from "types"
// import {products} from "utils/seed"

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

const ProductReview: React.FC<IProps> = ({reviews}) => {
  const [initialLoading, setInitialLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [rating, setRating] = useState("")
  const [state, setState] = useState(false)
  const [state2, setState2] = useState(false)

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
  const loading = false
  const error = false
  const count = 1

  const createReviewLoading = false
  const userInfo = true

  function handleClick(e: any) {
    setState(!state)
  }

  function handleClick2(e: any) {
    setState2(!state2)
  }

  return loading ? (
    <p>Loding....</p>
  ) : error ? (
    <ErrorMessage header={"Something went wrong"} message={error} />
  ) : (
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
                  autoWidth
                  value={rating}
                  className={classes.select}
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
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={createReviewLoading}
                  className={classes.button}
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
      )}
    </>
  )
}

export default ProductReview
