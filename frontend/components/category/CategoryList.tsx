import {List, Divider, CardContent, Card, CircularProgress} from "@material-ui/core"
import React, {useEffect} from "react"
import {createStyles} from "@material-ui/core/styles"
import {makeStyles} from "@material-ui/styles"
import CategoryItem from "./CategoryItem"
import {useAppDispatch, useAppSelector} from "app/hooks"
import {fetchCategories} from "features/category/categorySlice"
import theme from "theme"

const useStyles: any = makeStyles(() =>
  createStyles({
    list: {
      width: "100%",
      margin: 0,
      padding: 0,
      backgroundColor: theme.palette.background.paper,
    },
    loadingContainer: {
      textAlign: "center",
      margin: "100px 0",
    },
  })
)
const CategoryList = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  const {categories, status, error} = useAppSelector((state) => state.category)
  console.log("categories", categories)
  if (status === "loading") {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    )
  }
  return (
    <>
      {categories && (
        <Card>
          <CardContent>
            <List dense className={classes.list}>
              {categories.map((category) => (
                <div key={category.id}>
                  <CategoryItem
                    category={category}
                  />
                  <Divider component="li" />
                </div>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
      {error && <p>Oops, something went wrong</p>}
    </>
  )
}
export default CategoryList
