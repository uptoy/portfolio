import theme from 'src/theme'
import { CircularProgress } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

export const Circular = () => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          marginLeft: theme.spacing(2)
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    </ThemeProvider>
  )
}
