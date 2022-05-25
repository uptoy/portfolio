import { makeStyles } from '@material-ui/styles'
import theme from 'theme'
import { Copyright } from 'src/components'
import { Box } from '@material-ui/core'

const Footer = () => {
  return (
    <>
      <footer>
        <Box component="footer" sx={{ py: 6 }}>
          <Copyright />
        </Box>
      </footer>
    </>
  )
}
export default Footer
