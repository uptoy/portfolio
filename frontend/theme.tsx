import { createTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#19857b',
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
