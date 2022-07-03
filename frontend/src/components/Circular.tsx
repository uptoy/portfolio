import theme from 'src/theme'
import { CircularProgress,Box } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

export const Circular = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box component="div"
        sx={{
          display: 'flex',
          marginLeft: theme.spacing(2)
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    </ThemeProvider>
  )
}
