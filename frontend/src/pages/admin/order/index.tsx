import React from 'react'
import { AdminLayout } from 'src/components/dashboard'
import {
  Paper,
  Button,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer,
  Grid,
  TextField
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { pink } from '@mui/material/colors'

import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'

const pink500 = pink['500']

function createData(name: string, category: string, price: number, totalInStock: number) {
  return { name, category, price, totalInStock }
}

const rows = [
  createData('product1', 'category1', 6.0, 24),
  createData('product2', 'category2', 9.0, 37),
  createData('product3', 'category3', 16.0, 24),
  createData('product4', 'category4', 3.7, 67),
  createData('product5', 'category5', 16.0, 49)
]


export default function AdminOrderList() {
  const [state, setState] = React.useState({
    right: false
  })
  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  // Modal
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  // Modal
  return (
    <AdminLayout>
      <Fab
        size="small"
        color="secondary"
        sx={{
          top: 'auto',
          right: 20,
          bottom: 10,
          left: 'auto',
          position: 'fixed',
          marginRight: 20,
          backgroundColor: pink500
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Fab
        size="small"
        sx={{
          top: 'auto',
          right: 100,
          bottom: 10,
          left: 'auto',
          position: 'fixed',
          marginRight: 20,
          backgroundColor: 'lightblue'
        }}
        onClick={toggleDrawer('right', true)}
      >
        <SearchIcon />
      </Fab>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650
          }}
          aria-label="product table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Product Name </TableCell>
              <TableCell align="center">Category Name </TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Total In Stock </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.totalInStock}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: 40,
                      borderRadius: '50%',
                      padding: 5,
                      marginRight: 10
                    }}
                  >
                    <CreateIcon />
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: 40,
                      borderRadius: '50%',
                      padding: 5,
                      marginRight: 10
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer anchor="right" open={state['right']} onClose={toggleDrawer('right', false)}>
        <Grid
          container
          sx={{
            width: 280
          }}
          spacing={1}
        >
          <Grid
            item
            xs={12}
            sx={{
              margin: 10
            }}
          >
            <h5>Search</h5>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              margin: 10
            }}
          >
            <TextField
              placeholder="Product Name"
              label="Product Name"
              name="name"
              fullWidth={true}
              value={'name'}
              onChange={() => {}}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              margin: 10
            }}
          >
            <Button variant="contained" sx={{ marginRight: 20 }} onClick={() => {}} color="secondary">
              Search
            </Button>
            <Button variant="contained" sx={{ marginRight: 20 }} onClick={() => {}} color="secondary">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Drawer>
      {/* <CategoryManageModal open={open} handleClose={handleClose} /> */}
    </AdminLayout>
  )
}
