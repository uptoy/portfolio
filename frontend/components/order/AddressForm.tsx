import * as React from "react"
import {Button, Grid, Typography, TextField} from "@material-ui/core"
import {useForm, SubmitHandler} from "react-hook-form"

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"
interface IAddress {
  first_name: string
  last_name: string
  address1: string
  address2: string
  city: string
  state: string
  // Zip: string
  // Country: string
}

interface IProps {
  handleNext: () => void
  setAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>
}

const AddressForm: React.VFC<IProps> = ({handleNext, setAddress}) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm()
  const onSubmit: SubmitHandler<IAddress> = async (formData) => {
    setAddress(formData)
    handleNext()
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="first_name"
              label="First name"
              fullWidth
              variant="standard"
              {...register("first_name")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="last_name"
              label="Last name"
              fullWidth
              variant="standard"
              {...register("last_name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              label="Address line 1"
              fullWidth
              variant="standard"
              {...register("address1")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address2"
              label="Address line 2"
              fullWidth
              variant="standard"
              {...register("address2")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              label="City"
              fullWidth
              variant="standard"
              {...register("city")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              {...register("state")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              label="Zip / Postal code"
              fullWidth
              variant="standard"
              {...register("zip")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              label="Country"
              fullWidth
              variant="standard"
              {...register("country")}
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Button
            type="button"
            variant="contained"
            color="primary"
            style={{
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            <ArrowBackIosIcon />
            <p style={{margin: 5}}>Back</p>
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              marginTop: 10,
              marginLeft: 10,
              width: "7em",
              height: "3.4em",
            }}
            disableElevation
          >
            <div style={{display: "flex", alignItems: "center"}}>
              <p style={{margin: 5}}>Save</p>
              <ArrowForwardIos style={{margin: 5}} />
            </div>
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}

// return (
//   <Container component="main" maxWidth="xs">
//     <form  noValidate onSubmit={handleSubmit(handleForgotPassword)}>
//       <TextField
//         variant="outlined"
//         margin="normal"
//         required
//         fullWidth
//         id="first_name"
//         label="First Name"
//         autoComplete="first_name"
//         autoFocus
//         {...register("first_name")}
//       />
//       <TextField
//         variant="outlined"
//         margin="normal"
//         required
//         fullWidth
//         id="last_name"
//         label="Last Name"
//         autoComplete="last_name"
//         autoFocus
//         {...register("last_name")}
//       />
//       <Button
//         type="submit"
//         fullWidth
//         variant="contained"
//         color="primary"
//       >
//         Submit
//       </Button>
//     </form>
//   </Container>
// )

export default AddressForm
