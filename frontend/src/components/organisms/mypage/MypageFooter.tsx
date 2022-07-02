import theme from 'src/theme'
import { Copyright } from 'src/components'
import { Box } from '@mui/material'

const MypageFooter = () => {
  return (
    <>
      <footer
        style={{
          padding: theme.spacing(6)
        }}
      >
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
          <Copyright />
        </Box>
      </footer>
    </>
  )
}
export default MypageFooter
