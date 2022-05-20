import * as React from "react"
import {Grid, Typography, TextField} from "@material-ui/core"
import {Button} from "@material-ui/core"
import {useForm, SubmitHandler, Controller} from "react-hook-form"
import {IPayment} from "pages/checkout"
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import {makeStyles} from "@material-ui/styles"

interface IProps {
  handleNext: () => void
  setPayment: React.Dispatch<React.SetStateAction<IPayment | undefined>>
}

// const useStyles = makeStyles(() => ({
//   formControl: {
//     "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
//       borderColor: "blue",
//     },
//   },
//   select: {
//     "&:before": {
//       borderColor: "red",
//     },
//   },
// }))

const PaymentForm: React.VFC<IProps> = ({setPayment, handleNext}) => {
  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const years: number[] = []
  for (let i = 0; i < 21; i++) {
    const d = new Date()
    const year = d.getFullYear()
    years.push(year + i)
  }
  const {register, control, handleSubmit} = useForm<IPayment>({
    defaultValues: {
      exp_month: months[0],
      exp_year: years[0],
    },
  })
  const onSubmit: SubmitHandler<IPayment> = (formData) => {
    setPayment(formData)
    handleNext()
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="card_number"
              label="Card number"
              fullWidth
              variant="outlined"
              placeholder="4242 4242 4242 4242"
              {...(register("card_number"),
              {
                maxLength: 16,
                required: true,
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="holder_name"
              label="Holder Name"
              fullWidth
              variant="outlined"
              placeholder="TARO YAMADA"
              {...(register("holder_name"),
              {
                required: true,
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="exp_month"
              control={control}
              render={({field}) => (
                <FormControl style={{width: "7em"}}>
                  <InputLabel id="demo-simple-select-label">Month</InputLabel>
                  <Select {...field} required style={{width: "100%"}}>
                    {months?.map((month: number) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="exp_year"
              control={control}
              render={({field}) => (
                <FormControl style={{width: "7em", marginLeft: "1em"}}>
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>
                  <Select {...field} required style={{width: "100%"}}>
                    {years?.map((year: number) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="cvv"
              label="CVV"
              fullWidth
              variant="outlined"
              placeholder="123"
              {...(register("cvv"),
              {
                maxLength: 3,
              })}
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
    </React.Fragment>
  )
}

export default PaymentForm
