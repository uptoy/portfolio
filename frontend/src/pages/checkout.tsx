//library
import * as React from 'react'
import useSWR from 'swr'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'
import { Typography, Container, Box, Paper, Stepper, Step, StepLabel } from '@mui/material'
//private
import theme from 'src/theme'
import { ICartItem, IAddress, IPayment } from 'src/@types'
import { Link } from 'src/components'
import { Layout } from 'src/components/organisms'
import { Circular } from 'src/components/Circular'
import { AddressForm, PaymentForm, Review } from 'src/components/order'
//custom hook
import { useGetCart, useGetCartServer } from '@/hooks/fetcher'
//common

const steps = ['Shipping address', 'Payment details', 'Review your order']

function getStepContent(
  step: number,
  handleNext: () => void,
  setAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>,
  setPayment: React.Dispatch<React.SetStateAction<IPayment | undefined>>,
  address: IAddress | undefined,
  payment: IPayment | undefined,
  cartItems: ICartItem[]
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
  const cart = useGetCartServer()
  return { props: { cart } }
}
export default function Order(cart: ICartItem[]) {
  const { data, isLoading } = useGetCart(cart)
  const cartItems = data
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
                {getStepContent(activeStep, handleNext, setAddress, setPayment, address, payment, cartItems!)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </Layout>
  )
}
