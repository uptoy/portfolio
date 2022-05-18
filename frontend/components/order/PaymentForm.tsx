import * as React from "react"
import {Grid, Typography, TextField} from "@material-ui/core"
import {Button} from "@material-ui/core"
import {useForm} from "react-hook-form"
import {IPayment} from "pages/checkout"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"

interface IProps {
  handleNext: () => void
  setPayment: React.Dispatch<React.SetStateAction<IPayment | undefined>>
}

const PaymentForm: React.VFC<IProps> = ({setPayment, handleNext}) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm()
  const Submit = async (formData: any) => {
    console.log("formData", formData)
    setPayment(formData)
    handleNext()
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form noValidate onSubmit={handleSubmit(Submit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="card_number"
              label="Card number"
              fullWidth
              variant="standard"
              {...register("card_number")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              {...register("expDate")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              {...register("cvv")}
            />
          </Grid>
        </Grid>
        {/* <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button> */}
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

export default PaymentForm
