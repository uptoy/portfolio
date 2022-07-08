import React from 'react'
import {
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
  Box
} from '@mui/material'
import theme from 'src/theme'
import { SelectChangeEvent } from '@mui/material'

export default function EditProduct() {
  const [category, setCategory] = React.useState('')
  const handleChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value as string)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        component="div"
        sx={{
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Update Product
        </Typography>
        <Box
          component="form"
          sx={{
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
              width: '100%',
              backgroundColor: 'white'
            }}
          >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              onChange={() => handleChange}
            >
              <MenuItem value={'Car'}>Car</MenuItem>
              <MenuItem value={'Health'}>Health</MenuItem>
              <MenuItem value={'Electric'}>Electric</MenuItem>
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
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
