import * as React from "react"
import {Button, Grid, Typography, TextField} from "@material-ui/core"
import {useForm, SubmitHandler} from "react-hook-form"
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"
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
  } = useForm<IAddress>()

  const onSubmit: SubmitHandler<IAddress> = (formData) => {
    handleNext()
    setAddress(formData)
  }
  return (
    <>
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
              variant="outlined"
              {...register("first_name")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="last_name"
              label="Last name"
              fullWidth
              variant="outlined"
              {...register("last_name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              label="Address line 1"
              fullWidth
              variant="outlined"
              {...register("address1")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address2"
              label="Address line 2"
              fullWidth
              variant="outlined"
              {...register("address2")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              label="City"
              fullWidth
              variant="outlined"
              {...register("city")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              label="State/Province/Region"
              fullWidth
              variant="outlined"
              {...register("state")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              label="Zip / Postal code"
              fullWidth
              variant="outlined"
              {...register("zip")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              label="Country"
              fullWidth
              variant="outlined"
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
    </>
  )
}

export default AddressForm
