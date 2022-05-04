import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import createStyles from "@material-ui/styles/createStyles"
import {makeStyles} from "@material-ui/styles"
// import {categories} from "utils/seed"
import CircularProgress from "@material-ui/core/CircularProgress"

import CategoryItem from "./CategoryItem"
import theme from "theme"

import {useAppSelector} from "app/hooks"

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
  const classes = useStyles()

  const {categories, status} = useAppSelector((state) => state.category)

  if (status === "loading") {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardContent>
          <List dense className={classes.list}>
            {categories.map((category: any) => (
              <div key={category.id}>
                <CategoryItem category={category} />
                <Divider component="li" />
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  )
}

export default CategoryList
