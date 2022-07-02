import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { AdminLayout } from 'src/components/dashboard'
import { Button, Fab, Drawer, Grid, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import { pink } from '@material-ui/core/colors'
import { CategoryList } from 'src/components/category'
import { useRouter } from 'next/router'

const useStyles: any = makeStyles(() => ({
  fab: {
    top: 'auto',
    right: 20,
    bottom: 10,
    left: 'auto',
    position: 'fixed',
    marginRight: 20,
    backgroundColor: pink['500']
  },
  fabSearch: {
    top: 'auto',
    right: 100,
    bottom: 10,
    left: 'auto',
    position: 'fixed',
    marginRight: 20,
    backgroundColor: 'lightblue'
  },
  searchButton: {
    marginRight: 20
  },
  searchField: {
    margin: 10
  },
  searchDrawer: {
    overflow: 'hidden',
    width: 280
  }
}))

export default function AdminCategoryList() {
  const classes = useStyles()
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
      <Fab size="small" color="secondary" className={classes.fab} onClick={() => handleCategoryAdd()}>
        <AddIcon />
      </Fab>
      <Fab size="small" className={classes.fabSearch} onClick={toggleDrawer('right', true)}>
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
  const classes = useStyles()
  return (
    <Drawer anchor="right" open={open} onClose={onClick}>
      <Grid container className={classes.searchDrawer} spacing={1}>
        <Grid item xs={12} className={classes.searchField}>
          <h5>Search</h5>
        </Grid>
        <Grid item xs={12} className={classes.searchField}>
          <TextField placeholder="Category Name" label="Category Name" name="name" fullWidth={true} value={'name'} />
        </Grid>
        <Grid item xs={12} className={classes.searchField}>
          <Button variant="contained" className={classes.searchButton} onClick={() => {}} color="secondary">
            Search
          </Button>
          <Button variant="contained" className={classes.searchButton} onClick={onClick} color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  )
}
