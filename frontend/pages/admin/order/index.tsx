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
import { grey, pink } from "@material-ui/core/colors"
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete"
import Pagination from '@material-ui/lab/Pagination';

const pink500 = pink["500"]

function createData(name: string, category: string, price: number, totalInStock: number) {
  return { name, category, price, totalInStock }
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
}))

export default function AdminOrderList() {
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
      <Pagination count={10} color="primary" />
    </AdminDashboardLayout>
  )
}
