import { makeStyles } from "@material-ui/styles"
import theme from "theme"
import { Copyright } from "components"
import { Box } from "@material-ui/core"

const useStyles: any = makeStyles(() => ({
  footer: {
    padding: theme.spacing(6),
  },
}))

const MypageFooter = () => {
  const classes = useStyles()
  return (
    <>
      <footer className={classes.footer}>
        <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
          <Copyright />
        </Box>
      </footer>
    </>
  )
}
export default MypageFooter
