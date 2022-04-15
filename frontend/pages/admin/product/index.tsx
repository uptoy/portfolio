import {makeStyles} from "@material-ui/styles"
import {AdminLayout} from "components/Dashboard"
import theme from "theme"
import React, {useEffect, useState} from "react"
import {ImageUpload} from "../../../components/Product/ImageUpload"
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
import {ProductManageModal} from "components/Product"
import DeleteModal from "components/Modal/DeleteModal"
const pink500 = pink["500"]

function createData(name: string, category: string, price: number, totalInStock: number) {
  return {name, category, price, totalInStock}
}

const rows = [
  createData("product1", "category1", 6.0, 24),
  createData("product2", "category2", 9.0, 37),
  createData("product3", "category3", 16.0, 24),
  createData("product4", "category4", 3.7, 67),
  createData("product5", "category5", 16.0, 49),
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

export default function AdminProductList() {
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
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteOpen = () => {
    setOpen1(true)
  }
  const handleDeleteClose = () => {
    setOpen1(false)
  }

  // Modal

  return (
    <AdminLayout>
      <ImageUpload />
      {/* <Fab size="small" color="secondary" className={classes.fab} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Fab size="small" className={classes.fabSearch} onClick={toggleDrawer("right", true)}>
        <SearchIcon />
      </Fab>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="product table">
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
      <ProductManageModal open={open} handleClose={handleClose} />
      <DeleteModal open={open1} handleClose={handleDeleteClose} /> */}
    </AdminLayout>
  )
}
