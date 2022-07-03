import * as React from 'react'
import { Box, Button, ListItemText, Grid, List, ListItem, Typography } from '@mui/material'
import { ICartItem } from 'src/@types'
import { IAddress, IPayment } from 'src/@types'

interface IProps {
  address: IAddress | undefined
  payment: IPayment | undefined
  cartItems: ICartItem[]
  handleNext: () => void
}

const Review: React.FC<IProps> = ({ address, payment, handleNext, cartItems }) => {
  console.log('address', address)
  const Submit = () => {
    console.log('payment', payment)
    console.log('address', address)
    handleNext()
  }
  const totalPrice = cartItems?.reduce((total: number, cartItem: ICartItem): number => {
    return total + cartItem.quantity * cartItem.product.price
  }, 0)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={`Product: ${item.product?.product_name}`} secondary={`Quantity: ${item.quantity}`} />
            <Typography variant="body2">$ {(item.product?.price as number) * item.quantity}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Box component="div" sx={{ display: 'flex', paddingBottom: 5 }}>
            <Typography variant="inherit" sx={{ margin: 0, paddingRight: 5 }}>
              {address?.first_name}
            </Typography>
            <Typography variant="inherit" sx={{ margin: 0 }}>
              {address?.last_name}
            </Typography>
          </Box>
          <Box component="div">
            <Typography variant="inherit" sx={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>
              {address?.address1}
            </Typography>
            <Typography variant="inherit" sx={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>
              {address?.address2}
            </Typography>
            <Typography variant="inherit" sx={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>
              {address?.city}
            </Typography>
            <Typography variant="inherit" sx={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>
              {address?.country}
            </Typography>
            <Typography variant="inherit" sx={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>
              {address?.state}
            </Typography>
            <Typography variant="inherit" sx={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>
              {address?.zip}
            </Typography>
          </Box>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <Box component="div">
              <Typography variant="inherit" sx={{ margin: 0, paddingBottom: 5 }}>
                {payment?.card_number}
              </Typography>
              <Typography variant="inherit" sx={{ margin: 0, paddingBottom: 5 }}>
                {payment?.holder_name}
              </Typography>
              <Box component="div" style={{ display: 'flex' }}>
                <Typography
                  variant="inherit"
                  sx={{ margin: 0, paddingBottom: 5 }}
                >{`${payment?.exp_month} 月`}</Typography>
                <Typography
                  variant="inherit"
                  sx={{ margin: 0, paddingBottom: 5 }}
                >{`${payment?.exp_year} 年`}</Typography>
              </Box>
              <Typography variant="inherit" sx={{ margin: 0, paddingBottom: 5 }}>
                {payment?.cvv}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={() => Submit()}>
          Submit
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default Review
