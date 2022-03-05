import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'

const Theme: React.FC = ({ children }) => {
  // const { user } = useAppSelector((state) => state.auth);
  const user = {
    theme: 'theme',
  }

  const palletType = user?.theme === 'dark' ? 'dark' : 'light'

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#3498db',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default Theme
