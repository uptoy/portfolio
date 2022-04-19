import React, {useState} from "react"
import {makeStyles} from "@material-ui/styles"
import {AdminLayout} from "components/Dashboard"
import theme from "theme"
import {Button, Fab, Drawer, Grid, TextField} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import {pink} from "@material-ui/core/colors"
import {CategoryList} from "components/Category"
import {CategoryManageModal} from "components/Category"
import DeleteModal from "components/modal/DeleteModal"
// import { setSelectedModal } from '../slice';

const pink500 = pink["500"]

const useStyles: any = makeStyles(() => ({
  topContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  mainContainer: {
    maxWidth: 800,
    margin: "0 auto",
  },
  table: {
    minWidth: 650,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  fab: {
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    marginRight: 20,
    backgroundColor: pink500,
  },
  fabSearch: {
    top: "auto",
    right: 100,
    bottom: 20,
    left: "auto",
    position: "fixed",
    marginRight: 20,
    backgroundColor: "lightblue",
  },
  button: {
    minWidth: 40,
    borderRadius: "50%",
    padding: 5,
    marginRight: 10,
  },
  searchButton: {
    marginRight: 20,
  },
  searchField: {
    margin: 10,
  },
  searchDrawer: {
    overflow: "hidden",
    width: 280,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}))

export default function AdminCategoryList() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    right: false,
  })
  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setState({...state, [anchor]: open})
  }
  // Modal
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const [open1, setOpen1] = useState(false)
  const handleDeleteOpen = () => {
    setOpen1(true)
  }
  const handleDeleteClose = () => {
    setOpen1(false)
  }
  // Modal

  return (
    <AdminLayout>
      <Fab size="small" color="secondary" className={classes.fab} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Fab size="small" className={classes.fabSearch} onClick={toggleDrawer("right", true)}>
        <SearchIcon />
      </Fab>
      <CategoryList
        open={open}
        open1={open1}
        handleOpen={handleOpen}
        handleDeleteOpen={handleDeleteOpen}
      />
      {/* {selectedModal === "manageCategoryModal" && <CategoryManageModal />} */}
      <Drawer anchor="right" open={state["right"]} onClose={toggleDrawer("right", false)}>
        <Grid container className={classes.searchDrawer} spacing={1}>
          <Grid item xs={12} className={classes.searchField}>
            <h5>Search</h5>
          </Grid>
          <Grid item xs={12} className={classes.searchField}>
            <TextField
              placeholder="Product Name"
              label="Product Name"
              name="name"
              fullWidth={true}
              value={"name"}
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} className={classes.searchField}>
            <Button
              variant="contained"
              className={classes.searchButton}
              onClick={() => {}}
              color="secondary"
            >
              Search
            </Button>
            <Button
              variant="contained"
              className={classes.searchButton}
              onClick={() => {}}
              color="secondary"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Drawer>
      <CategoryManageModal open={open} handleClose={handleClose} />
      <DeleteModal open={open1} handleClose={handleDeleteClose} />
    </AdminLayout>
  )
}
