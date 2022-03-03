import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    background:{
      paper:"#fff"
    },
    secondary: {
      main: '#19857b',
    },
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#000000', //black
      secondary: '#fff', //white
    },
  },
})

export default theme
