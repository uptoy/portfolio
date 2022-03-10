import React from "react"
import { makeStyles } from "@material-ui/styles"
import { AdminLayout } from "components/Dashboard"
import theme from "theme"
import {
  Button,
  Fab,
  Drawer,
  Grid,
  TextField,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import { pink } from "@material-ui/core/colors"
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete"
import {CategoryList,CategoryManageModal} from "components/Category"
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
    setState({ ...state, [anchor]: open })
  }

  return (
    <AdminLayout>
      <Fab size="small" color="secondary" className={classes.fab} onClick={() => {}}>
        <AddIcon />
      </Fab>
      <Fab size="small" className={classes.fabSearch} onClick={toggleDrawer("right", true)}>
        <SearchIcon />
      </Fab>
      {/* tablecontainer */}
      <div className={classes.topContainer}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          // onClick={() => dispatch(setSelectedModal("manageCategoryModal"))}
        >
          Add Category
        </Button>
      </div>
      <CategoryList />
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
    </AdminLayout>
  )
}
