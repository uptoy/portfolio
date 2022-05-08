import {CircularProgress} from "@material-ui/core"
import React from "react"
import createStyles from "@material-ui/styles/createStyles"
import {makeStyles} from "@material-ui/styles"
import CategoryItem from "./CategoryItem"
import useSWR from "swr"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import {fetcher} from "pages/admin/product/add"
import {Category} from "@types"
const BaseURL = "http://localhost:8080/api"

const useStyles: any = makeStyles(() =>
  createStyles({
    container: {
      height: "83%",
    },
    loadingContainer: {
      textAlign: "center",
      margin: "100px 0",
    },
  })
)
const CategoryList = () => {
  const classes = useStyles()
  const {data, error, mutate} = useSWR(`${BaseURL}/categories`, fetcher)
  const categories = data?.data
  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    )
  }
  return (
    <>
      {categories && (
        <TableContainer component={Paper} className={classes.container}>
          <Table aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{padding: 5}}>
                  ID
                </TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Updated At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category: Category) => (
                <CategoryItem key={category.id} category={category} mutate={mutate} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && <p>Oops, something went wrong</p>}
    </>
  )
}
export default CategoryList

// import Card from "@material-ui/core/Card"
// import CardContent from "@material-ui/core/CardContent"
// import Divider from "@material-ui/core/Divider"
// import List from "@material-ui/core/List"
// import createStyles from "@material-ui/styles/createStyles"
// import {makeStyles} from "@material-ui/styles"
// // import {categories} from "utils/seed"
// import CircularProgress from "@material-ui/core/CircularProgress"

// import CategoryItem from "./CategoryItem"
// import theme from "theme"

// import {useAppSelector} from "app/hooks"

// const useStyles: any = makeStyles(() =>
//   createStyles({
//     list: {
//       width: "100%",
//       margin: 0,
//       padding: 0,
//       backgroundColor: theme.palette.background.paper,
//     },
//     loadingContainer: {
//       textAlign: "center",
//       margin: "100px 0",
//     },
//   })
// )

// const CategoryList = () => {
//   const classes = useStyles()

//   const {categories, status} = useAppSelector((state) => state.category)

//   if (status === "loading") {
//     return (
//       <div className={classes.loadingContainer}>
//         <CircularProgress />
//       </div>
//     )
//   }

//   return (
//     <>
//       <Card>
//         <CardContent>
//           <List dense className={classes.list}>
//             {categories.map((category: any) => (
//               <div key={category.id}>
//                 <CategoryItem category={category} />
//                 <Divider component="li" />
//               </div>
//             ))}
//           </List>
//         </CardContent>
//       </Card>
//     </>
//   )
// }

// export default CategoryList
