import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import {createStyles} from "@material-ui/core/styles"
import {makeStyles} from "@material-ui/styles"
import {categories} from "utils/seed"

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

interface IProps {
  open: boolean
  open1: boolean
  handleOpen(): void
  handleDeleteOpen(): void
}

// ;<CategoryList
//   open={open}
//   open1={open1}
//   handleOpen={handleOpen}
//   handleDeleteOpen={handleDeleteOpen}
// />

const CategoryList = (props: IProps) => {
  const classes = useStyles()

  // const { categories, status } = useAppSelector((state) => state.categories)

  // if (status === "loading") {
  //   return (
  //     <div className={classes.loadingContainer}>
  //       <CircularProgress />
  //     </div>
  //   )
  // }

  return (
    <>
      <Card>
        <CardContent>
          <List dense className={classes.list}>
            {categories.map((category) => (
              <div key={category.id}>
                <CategoryItem
                  category={category}
                  open={props.open}
                  open1={props.open1}
                  handleOpen={props.handleOpen}
                  handleDeleteOpen={props.handleDeleteOpen}
                />
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
