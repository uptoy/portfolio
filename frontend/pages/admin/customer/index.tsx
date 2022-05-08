import React, {useState} from "react"
import {makeStyles} from "@material-ui/styles"
import {AdminLayout} from "components/dashboard"
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
import {UserManageModal} from "components/user"
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
    // overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    // overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  fab: {
    top: "auto",
    right: 20,
    bottom: 10,
    left: "auto",
    position: "fixed",
    marginRight: 20,
    backgroundColor: pink500,
  },
  fabSearch: {
    top: "auto",
    right: 100,
    bottom: 10,
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
    // overflow: "hidden",
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

    </AdminLayout>
  )
}
