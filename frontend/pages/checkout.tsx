//address noting patern
import * as React from "react"
import {
  Button,
  Typography,
  Container,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core"
import {AddressForm, PaymentForm, Review} from "components/order"
import {Layout} from "components/organisms"
import {Link} from "components"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"

const useStyles: any = makeStyles(() => ({
  stepper: {
    justifyContent: "center",
    paddingBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "11em",
      margin: "auto",
    },
  },
}))

const steps = ["Shipping address", "Payment details", "Review your order"]

export interface IPayment {
  CardNumber: number
  HolderName: string
  Cvv: number
}

export interface IAddress {
  FirstName: string
  LastName: string
  AddressLine1: string
  AddressLine2: string
  City: string
  State: string
  Zip: string
  Country: string
}

function getStepContent(
  step: number,
  handleNext: () => void,
  setAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>,
  setPayment: React.Dispatch<React.SetStateAction<IPayment | undefined>>,
  address: IAddress | undefined,
  payment: IPayment | undefined
) {
  switch (step) {
    case 0:
      return <AddressForm handleNext={handleNext} setAddress={setAddress} />
    case 1:
      return <PaymentForm handleNext={handleNext} setPayment={setPayment} />
    case 2:
      return <Review handleNext={handleNext} address={address} payment={payment} />
    default:
      throw new Error("Unknown step")
  }
}
export default function Order() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [address, setAddress] = React.useState<IAddress | undefined>()
  const [payment, setPayment] = React.useState<IPayment | undefined>()

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <Layout>
      <Container component="main" maxWidth="sm" sx={{mb: 4}}>
        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, py: {xs: 2, md: 5}, px: {xs: 2, md: 2}}}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{pt: 3, pb: 5}}
            connector={null}
            className={classes.stepper}
          >
            {steps.map((label) => (
              <Step style={{padding: 5}} key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
                <Box style={{textAlign: "center", marginTop: "1em"}}>
                  <Link href="/">Back to Top</Link>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, handleNext, setAddress, setPayment, address, payment)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </Layout>
  )
}
