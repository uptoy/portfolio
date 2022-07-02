import theme from 'src/theme'
import { Copyright } from 'src/components'
import { Box } from '@mui/material'

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
