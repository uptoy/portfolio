import * as React from "react"
import {Button, Grid, Typography, TextField, FormControlLabel, Checkbox} from "@material-ui/core"
import {useForm} from "react-hook-form"
import {IAddress} from "pages/checkout"

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
  const Submit = async (formData: any) => {
    setAddress(formData)
    handleNext()
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form noValidate onSubmit={handleSubmit(Submit)}>
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
              id="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              {...register("state")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="zip" label="Zip / Postal code" fullWidth variant="standard" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="country" label="Country" fullWidth variant="standard" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
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
