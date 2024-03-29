import theme from "src/theme"
import {makeStyles} from "@material-ui/styles"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}))

export const Circular = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  )
}
