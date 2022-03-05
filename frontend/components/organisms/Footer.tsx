import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import theme from 'theme'
import { Copyright } from 'components'

const useStyles: any = makeStyles(() => ({
  footer: {
    padding: theme.spacing(6),
  },
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Copyright />
      </footer>
    </>
  )
}
export default Footer
