import CircularProgress from '@material-ui/core/CircularProgress'
import createStyles from "@material-ui/styles/createStyles"
import { makeStyles } from '@material-ui/styles'

import logo from 'http://placehold.jp/150x150.png'

const useStyles: any = makeStyles(() =>
  createStyles({
    container: {
      position: 'fixed',
      width: '100%',
      height: '100vh',
      right: 0,
      top: 0,
    },
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      flexDirection: 'column',
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 20,
    },
  })
)

const PageLoader = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.loading}>
        <img src='http://placehold.jp/150x150.png' alt="Budgetpal logo" className={classes.logo} />
        <CircularProgress />
      </div>
    </div>
  )
}

export default PageLoader
