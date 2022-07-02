import React from 'react'
import {
  CssBaseline,
  Box,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material'
import theme from 'src/theme'
import { SelectChangeEvent } from '@mui/material'

export default function EditProduct() {
  const [age, setAge] = React.useState<number>()
  const handleChange = (e: SelectChangeEvent<number>) => {
    const value: number = e.target.value as number
    setAge(value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        component="div"
        sx={{ marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography component="h1" variant="h5">
          Edit Product
        </Typography>
        <form
          style={{
            width: '100%',
            marginTop: theme.spacing(1)
          }}
          noValidate
        >
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
            sx={{
              height: 100
            }}
          />
          <FormControl
            sx={{
              width: '100%'
            }}
          >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} onChange={handleChange}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              margin: theme.spacing(3, 0, 2)
            }}
          >
            Edit
          </Button>
        </form>
      </Box>
    </Container>
  )
}

const Sample = () => {
  return (
    <>
      <Typography variant="h3" sx={{}}>
        Category Edit
      </Typography>
      <Box component="div" sx={{}}></Box>
    </>
  )
}
