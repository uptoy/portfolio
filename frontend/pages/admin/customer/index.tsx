import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/styles"
import { AdminDashboardLayout } from "components/dashboard"
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
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import { pink } from "@material-ui/core/colors"
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete"

const pink500 = pink["500"]

function createData(
  id: string,
  profileImage: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
) {
  return { id, profileImage, firstName, lastName, email, phone }
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
}))

export default function AdminCustomerList() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <AdminDashboardLayout open={open} onClick={handleDrawerOpen}>
      <Fab size="small" color="secondary" className={classes.fab} onClick={() => {}}>
        <AddIcon />
      </Fab>
      <Fab size="small" className={classes.fabSearch} onClick={() => {}}>
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
                  <Button variant="contained" className={classes.button}>
                    <CreateIcon />
                  </Button>
                  <Button variant="contained" className={classes.button}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminDashboardLayout>
  )
}
