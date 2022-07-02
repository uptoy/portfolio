//address noting patern
import { GetServerSidePropsContext, GetServerSideProps } from 'next'
import * as React from 'react'
import { Typography, Container, Box, Paper, Stepper, Step, StepLabel } from '@mui/material'
import { AddressForm, PaymentForm, Review } from 'src/components/order'
import { Layout } from 'src/components/organisms'
import { Link } from 'src/components'
import theme from 'src/theme'
import { fetcher } from './cart'
import useSWR from 'swr'
import { Circular } from 'src/components/Circular'
import { CartItem } from 'src/@types'
import { BaseURL } from '@/common'

const steps = ['Shipping address', 'Payment details', 'Review your order']

export interface IPayment {
  card_number: number
  holder_name: string
  exp_month: number
  exp_year: number
  cvv: number
}

export interface IAddress {
  first_name: string
  last_name: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
}

function getStepContent(
  step: number,
  handleNext: () => void,
  setAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>,
  setPayment: React.Dispatch<React.SetStateAction<IPayment | undefined>>,
  address: IAddress | undefined,
  payment: IPayment | undefined,
  cartItems: CartItem[]
) {
  switch (step) {
    case 0:
      return <AddressForm handleNext={handleNext} setAddress={setAddress} />
    case 1:
      return <PaymentForm handleNext={handleNext} setPayment={setPayment} />
    case 2:
      return <Review handleNext={handleNext} address={address} payment={payment} cartItems={cartItems} />
    default:
      throw new Error('Unknown step')
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { req } = ctx
  if (req.headers.cookie === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signup'
      }
    }
  }
  const res = await fetch(`${BaseURL}/cart`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  const cart = await res.json()
  return { props: { cart } }
}
export default function Order(cart: CartItem) {
  // const classes = useStyles()
  const { data, isLoading } = useCarts(cart)
  const cartItems = data.data
  console.log(cartItems)
  const [activeStep, setActiveStep] = React.useState(0)
  const [address, setAddress] = React.useState<IAddress | undefined>()
  const [payment, setPayment] = React.useState<IPayment | undefined>()

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  if (isLoading) return <Circular />
  return (
    <Layout>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, py: { xs: 2, md: 5 }, px: { xs: 2, md: 2 } }}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            connector={null}
            sx={{
              justifyContent: 'center',
              paddingBottom: '1em',
              [theme.breakpoints.down('sm')]: {
                display: 'block',
                width: '11em',
                margin: 'auto',
                pt: 3,
                pb: 5
              }
            }}
          >
            {steps.map((label) => (
              <Step style={{ padding: 5 }} key={label}>
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
                  Your order number is #2001539. We have emailed your order confirmation, and will send you an update
                  when your order has shipped.
                </Typography>
                <Box style={{ textAlign: 'center', marginTop: '1em' }}>
                  <Link href="/">Back to Top</Link>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, handleNext, setAddress, setPayment, address, payment, cartItems)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </Layout>
  )
}

const useCarts = (cart: CartItem) => {
  const { data, error } = useSWR(`${BaseURL}/cart`, fetcher, {
    fallbackData: cart,
    revalidateOnMount: true
  })
  return { data: data, isLoading: !error && !data }
}
