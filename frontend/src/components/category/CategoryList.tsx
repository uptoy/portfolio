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
