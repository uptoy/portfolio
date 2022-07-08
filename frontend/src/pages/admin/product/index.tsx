import React from 'react'
import { ProductList } from 'src/components/product'
import { useRouter } from 'next/router'
import { AdminLayout } from 'src/components/dashboard'
import { Button, Fab, Drawer, Grid, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { pink } from '@mui/material/colors'

export default function AdminProductList() {
  const [state, setState] = React.useState({
    right: false
  })
  const router = useRouter()
  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [anchor]: open })
  }
  const handleProductAdd = () => {
    router.push('/admin/product/add')
  }
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
          backgroundColor: pink['500']
        }}
        onClick={() => handleProductAdd()}
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
      <ProductList />
      <ProductDraw open={state['right']} onClick={toggleDrawer('right', false)} />
    </AdminLayout>
  )
}

interface IProps {
  open: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const ProductDraw = ({ open, onClick }: IProps) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClick}>
      <Grid container sx={{ overflow: 'hidden', width: 280 }} spacing={1}>
        <Grid item xs={12} sx={{ margin: 10 }}>
          <h5>Search</h5>
        </Grid>
        <Grid item xs={12} sx={{ margin: 10 }}>
          <TextField
            placeholder="Product Name"
            label="Product Name"
            name="name"
            fullWidth={true}
            value={'name'}
            onChange={() => {}}
          />
        </Grid>
        <Grid item xs={12} sx={{ margin: 10 }}>
          <Button variant="contained" sx={{ marginRight: 20 }} onClick={() => {}} color="secondary">
            Search
          </Button>
          <Button variant="contained" sx={{ marginRight: 20 }} onClick={() => {}} color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  )
}


