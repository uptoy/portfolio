// import React, {MouseEventHandler} from "react"
// import {makeStyles} from "@material-ui/styles"
// import {AdminLayout} from "components/dashboard"
// import theme from "theme"
// import {Button, Fab, Drawer, Grid, TextField} from "@material-ui/core"
// import AddIcon from "@material-ui/icons/Add"
// import SearchIcon from "@material-ui/icons/Search"
// import {pink} from "@material-ui/core/colors"
// import {ProductList} from "components/product"
// import {useRouter} from "next/router"

// const useStyles: any = makeStyles(() => ({
//   topContainer: {
//     display: "flex",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   mainContainer: {
//     maxWidth: 800,
//     margin: "0 auto",
//   },
//   table: {
//     minWidth: 650,
//   },
//   content: {
//     flexGrow: 1,
//     height: "100vh",
//     overflow: "auto",
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: "flex",
//     overflow: "auto",
//     flexDirection: "column",
//   },
//   fixedHeight: {
//     height: 240,
//   },
//   fab: {
//     top: "auto",
//     right: 20,
//     bottom: 20,
//     left: "auto",
//     position: "fixed",
//     marginRight: 20,
//     backgroundColor: pink["500"],
//   },
//   fabSearch: {
//     top: "auto",
//     right: 100,
//     bottom: 20,
//     left: "auto",
//     position: "fixed",
//     marginRight: 20,
//     backgroundColor: "lightblue",
//   },
//   button: {
//     minWidth: 40,
//     borderRadius: "50%",
//     padding: 5,
//     marginRight: 10,
//   },
//   searchButton: {
//     marginRight: 20,
//   },
//   searchField: {
//     margin: 10,
//   },
//   searchDrawer: {
//     overflow: "hidden",
//     width: 280,
//   },
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: "auto",
//   },
// }))

// export default function AdminProductList() {
//   const classes = useStyles()
//   const router = useRouter()
//   const [state, setState] = React.useState({
//     right: false,
//   })
//   const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
//     if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
//       return
//     }
//     setState({...state, [anchor]: open})
//   }
//   const handleProductAdd = () => {
//     router.push("/admin/product/add")
//   }
//   return (
//     <AdminLayout>
//       <Fab size="small" color="secondary" className={classes.fab} onClick={handleProductAdd}>
//         <AddIcon />
//       </Fab>
//       <Fab size="small" className={classes.fabSearch} onClick={toggleDrawer("right", true)}>
//         <SearchIcon />
//       </Fab>
//       <ProductList />
//       <SearchDrawer state={state} onClose={toggleDrawer("right", false)} />
//     </AdminLayout>
//   )
// }
// interface IProps {
//   state: {
//     right: boolean
//   }
//   onClose: (e: MouseEventHandler) => void
// }

// const SearchDrawer = (props: IProps) => {
//   const classes = useStyles()
//   const {state, onClose} = props
//   return (
//     <Drawer anchor="right" open={state["right"]} onClose={onClose}>
//       <Grid container className={classes.searchDrawer} spacing={1}>
//         <Grid item xs={12} className={classes.searchField}>
//           <h5>Search</h5>
//         </Grid>
//         <Grid item xs={12} className={classes.searchField}>
//           <TextField
//             placeholder="Product Name"
//             label="Product Name"
//             name="name"
//             fullWidth={true}
//             value={"name"}
//             onChange={() => {}}
//           />
//         </Grid>
//         <Grid item xs={12} className={classes.searchField}>
//           <Button
//             variant="contained"
//             className={classes.searchButton}
//             onClick={() => {}}
//             color="secondary"
//           >
//             Search
//           </Button>
//           <Button
//             variant="contained"
//             className={classes.searchButton}
//             onClick={() => {}}
//             color="secondary"
//           >
//             Cancel
//           </Button>
//         </Grid>
//       </Grid>
//     </Drawer>
//   )
// }

import React from "react"
import {makeStyles} from "@material-ui/styles"
import {AdminLayout} from "components/dashboard"
import theme from "theme"
import {Button, Fab, Drawer, Grid, TextField} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import {pink} from "@material-ui/core/colors"
import {ProductList, ProductManageModal} from "components/product"
import {useAppDispatch, useAppSelector} from "app/hooks"
import {setSelectedModal} from "features/product/productSlice"
import {useRouter} from "next/router"

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
    backgroundColor: pink["500"],
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
  const router = useRouter()
  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setState({...state, [anchor]: open})
  }
  const dispatch = useAppDispatch()
  const {selectedModal} = useAppSelector((state) => state.product)

  return (
    <AdminLayout>
      <Fab
        size="small"
        color="secondary"
        className={classes.fab}
        onClick={() => router.push("/admin/product/add")}
      >
        <AddIcon />
      </Fab>
      <Fab size="small" className={classes.fabSearch} onClick={toggleDrawer("right", true)}>
        <SearchIcon />
      </Fab>
      <ProductList />
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
