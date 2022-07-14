import * as React from 'react'
import { Box, Button, ListItemText, Grid, List, ListItem, Typography } from '@material-ui/core'
import { IAddress, IPayment } from 'src/pages/checkout'
import { CartItem } from 'src/@types'

interface IProps {
  address: IAddress | undefined
  payment: IPayment | undefined
  cartItems: CartItem[]
  handleNext: () => void
}

const Review: React.FC<IProps> = ({ address, payment, handleNext, cartItems }) => {
  console.log('address', address)
  const Submit = () => {
    console.log('payment', payment)
    console.log('address', address)
    handleNext()
  }
  const totalPrice: number = cartItems?.reduce((total: number, cartItem: CartItem): number => {
    const price = cartItem && cartItem.product ? cartItem.product.price : 0
    return total + cartItem.quantity * price
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
          <div style={{ display: 'flex', paddingBottom: 5 }}>
            <p style={{ margin: 0, paddingRight: 5 }}>{address?.first_name}</p>
            <p style={{ margin: 0 }}>{address?.last_name}</p>
          </div>
          <div>
            <p style={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>{address?.address1}</p>
            <p style={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>{address?.address2}</p>
            <p style={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>{address?.city}</p>
            <p style={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>{address?.country}</p>
            <p style={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>{address?.state}</p>
            <p style={{ margin: 0, paddingRight: 5, paddingBottom: 5 }}>{address?.zip}</p>
          </div>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <div>
              <p style={{ margin: 0, paddingBottom: 5 }}>{payment?.card_number}</p>
              <p style={{ margin: 0, paddingBottom: 5 }}>{payment?.holder_name}</p>
              <div style={{ display: 'flex' }}>
                <p style={{ margin: 0, paddingBottom: 5 }}>{`${payment?.exp_month} 月`}</p>
                <p style={{ margin: 0, paddingBottom: 5 }}>{`${payment?.exp_year} 年`}</p>
              </div>
              <p style={{ margin: 0, paddingBottom: 5 }}>{payment?.cvv}</p>
            </div>
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
