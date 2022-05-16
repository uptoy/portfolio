import * as React from "react"
import {Box, Button, ListItemText, Grid, List, ListItem, Typography} from "@material-ui/core"
import {IAddress, IPayment} from "pages/checkout"

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  {name: "Shipping", desc: "", price: "Free"},
]
const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"]
const payments = [
  {name: "Card type", detail: "Visa"},
  {name: "Card holder", detail: "Mr John Smith"},
  {name: "Card number", detail: "xxxx-xxxx-xxxx-1234"},
  {name: "Expiry date", detail: "04/2024"},
]

interface IProps {
  address: IAddress | undefined
  payment: IPayment | undefined
  handleNext: () => void
}

const Review: React.VFC<IProps> = ({address, payment, handleNext}) => {
  const Submit = () => {
    console.log("payment", payment)
    console.log("address", address)
    handleNext()
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{py: 1, px: 0}}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{py: 1, px: 0}}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{fontWeight: 700}}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{mt: 2}}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{mt: 2}}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{display: "flex", justifyContent: "flex-end"}}>
        {/* {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
            Back
          </Button>
        )}
        <Button variant="contained" onClick={handleNext} sx={{mt: 3, ml: 1}}>
          {activeStep === steps.length - 1 ? "Place order" : "Next"}
        </Button> */}
        <Button onClick={() => Submit()}>button</Button>
      </Box>
    </React.Fragment>
  )
}

export default Review
