import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CircularProgress from "@material-ui/core/CircularProgress"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import { createStyles, Theme  } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/styles"
import { ICategory } from "types"

import CategoryItem from "./CategoryItem"
import theme from "theme"

// import { useAppSelector } from 'app/hooks';

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

  // const { categories, status } = useAppSelector((state) => state.categories)

  // if (status === "loading") {
  //   return (
  //     <div className={classes.loadingContainer}>
  //       <CircularProgress />
  //     </div>
  //   )
  // }
  const category1 = {
    id: "id1",
    title: "title1",
    user_id: "user_id1",
  }
  const category2 = {
    id: "id2",
    title: "title2",
    user_id: "user_id2",
  }
  const categories: ICategory[] = [category1, category2]

  // id: string;
  // title: string;
  // user_id: string;
  return (
    <>
      <Card>
        <CardContent>
          <List dense className={classes.list}>
            {categories.map((category) => (
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
