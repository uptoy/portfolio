import * as React from 'react'
import { Grid, Typography, TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IPayment } from 'src/pages/checkout'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

interface IProps {
  handleNext: () => void
  setPayment: React.Dispatch<React.SetStateAction<IPayment | undefined>>
}

const PaymentForm: React.FC<IProps> = ({ setPayment, handleNext }) => {
  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const years: number[] = []
  for (let i = 0; i < 21; i++) {
    const d = new Date()
    const year = d.getFullYear()
    years.push(year + i)
  }
  const {
    register,
    formState: { dirtyFields },
    getValues,
    control,
    handleSubmit
  } = useForm<IPayment>({
    defaultValues: {
      exp_month: months[0],
      exp_year: years[0]
    }
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
              required
              id="card_number"
              label="Card Number"
              fullWidth
              variant="outlined"
              {...register('card_number')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="holder_name"
              label="Holder Name"
              fullWidth
              variant="outlined"
              {...register('holder_name')}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="exp_month"
              control={control}
              render={({ field }) => (
                <FormControl style={{ width: '7em' }}>
                  <InputLabel id="demo-simple-select-label">Month</InputLabel>
                  <Select {...field} required style={{ width: '100%' }}>
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
              render={({ field }) => (
                <FormControl style={{ width: '7em', marginLeft: '1em' }}>
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>
                  <Select {...field} required style={{ width: '100%' }}>
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
            <TextField required id="cvv" label="CVV" fullWidth variant="outlined" {...register('cvv')} />
          </Grid>
        </Grid>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              marginTop: 10,
              marginLeft: 10,
              width: '7em',
              height: '3.4em'
            }}
            disabled={(dirtyFields.card_number && dirtyFields.holder_name && dirtyFields.cvv) !== true}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: 5 }}>Save</p>
              <ArrowForwardIos style={{ margin: 5 }} />
            </div>
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}

export default PaymentForm
