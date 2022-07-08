import React from 'react'
import { AdminLayout } from 'src/components/dashboard'
import { Box, Button, Fab, Drawer, Grid, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { pink } from '@mui/material/colors'
import { CategoryList } from 'src/components/category'
import { useRouter } from 'next/router'

// const useStyles: any = makeStyles(() => ({
//   fab: {
//     top: 'auto',
//     right: 20,
//     bottom: 10,
//     left: 'auto',
//     position: 'fixed',
//     marginRight: 20,
//     backgroundColor: pink['500']
//   },
//   fabSearch: {
//     top: 'auto',
//     right: 100,
//     bottom: 10,
//     left: 'auto',
//     position: 'fixed',
//     marginRight: 20,
//     backgroundColor: 'lightblue'
//   },
//   searchButton: {
//     marginRight: 20
//   },
//   searchField: {
//     margin: 10
//   },
//   searchDrawer: {
//     overflow: 'hidden',
//     width: 280
//   }
// }))

export default function AdminCategoryList() {
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
  const handleCategoryAdd = () => {
    router.push('/admin/category/add')
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
        onClick={() => handleCategoryAdd()}
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
      <CategoryList />
      <CategoryDraw open={state['right']} onClick={toggleDrawer('right', false)} />
    </AdminLayout>
  )
}

interface IProps {
  open: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const CategoryDraw = ({ open, onClick }: IProps) => {
  // const classes = useStyles()
  return (
    <Drawer anchor="right" open={open} onClose={onClick}>
      <Grid
        container
        sx={{
          overflow: 'hidden',
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
          <Typography variant="h5">Search</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            margin: 10
          }}
        >
          <TextField placeholder="Category Name" label="Category Name" name="name" fullWidth={true} value={'name'} />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            margin: 10
          }}
        >
          <Button
            variant="contained"
            sx={{
              marginRight: 20
            }}
            onClick={() => {}}
            color="secondary"
          >
            Search
          </Button>
          <Button
            variant="contained"
            sx={{
              marginRight: 20
            }}
            onClick={onClick}
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  )
}

