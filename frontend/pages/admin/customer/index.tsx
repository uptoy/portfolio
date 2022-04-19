import React, {useState} from "react"
import {makeStyles} from "@material-ui/styles"
import {AdminLayout} from "components/Dashboard"
import theme from "theme"
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
  TextField,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import {pink} from "@material-ui/core/colors"
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete"
import {CustomerManageModal} from "components/customer"
import DeleteModal from "components/modal/DeleteModal"

const pink500 = pink["500"]

function createData(
  id: string,
  profileImage: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
) {
  return {id, profileImage, firstName, lastName, email, phone}
}

const rows = [
  createData(
    "id1",
    "http://placehold.jp/150x150.png",
    "firstName1",
    "lastName1",
    "email1@email.com",
    "010-0101-0101"
  ),
  createData(
    "id2",
    "http://placehold.jp/150x150.png",
    "firstName2",
    "lastName2",
    "email2@email.com",
    "010-0101-0102"
  ),
  createData(
    "id3",
    "http://placehold.jp/150x150.png",
    "firstName3",
    "lastName3",
    "email3@email.com",
    "010-0101-0103"
  ),
  createData(
    "id4",
    "http://placehold.jp/150x150.png",
    "firstName4",
    "lastName4",
    "email4@email.com",
    "010-0101-0104"
  ),
  createData(
    "id5",
    "http://placehold.jp/150x150.png",
    "firstName5",
    "lastName5",
    "email5@email.com",
    "010-0101-0105"
  ),
]

const useStyles: any = makeStyles(() => ({
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

export default function AdminCustomerList() {
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>Profile Image</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <img src={row.profileImage} alt="profile_image1" />
                </TableCell>
                <TableCell align="center">{row.firstName}</TableCell>
                <TableCell align="center">{row.lastName}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" className={classes.button} onClick={handleOpen}>
                    <CreateIcon />
                  </Button>
                  <Button variant="contained" className={classes.button} onClick={handleDeleteOpen}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <CustomerManageModal open={open} handleClose={handleClose} />
      <DeleteModal open={open1} handleClose={handleDeleteClose} />
    </AdminLayout>
  )
}
