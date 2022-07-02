import React from "react"
import {
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import {makeStyles} from "@material-ui/styles"
import theme from "src/theme"

const useStyles: any = makeStyles(() => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  category: {
    width: "100%",
    backgroundColor: "white",
  },
  description: {
    height: 100,
  },
}))

export default function EditProduct() {
  const classes = useStyles()
  const [age, setAge] = React.useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value as string)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Product
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="product_name"
            label="Product Name"
            name="product_name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="brand"
            label="Brand"
            name="brand"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="count_in_stock"
            label="CountInStock"
            name="count_in_stock"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoFocus
            className={classes.description}
          />
          <FormControl className={classes.category}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={() => handleChange}
            >
              <MenuItem value={"Car"}>Car</MenuItem>
              <MenuItem value={"Health"}>Health</MenuItem>
              <MenuItem value={"Electric"}>Electric</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  )
}
