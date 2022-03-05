import { createTheme } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { purple, red, common } from '@material-ui/core/colors'

// Create a theme instance.
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#2979ff',
    },
    // error: {
    //   main: '#19857b',
    // },
    warning: {
      main: red[900],
    },
    // info: {
    //   main: '#19857b',
    // },
    // success: {
    //   main: '#19857b',
    //   // light: '',
    //   // dark: '',
    //   // contrastText: '',
    // },
    background: {
      default: common.white,
      // paper: common.black,
    },
    // text: {
    //   primary: '',
    //   secondary: '',
    //   disabled: '',
    // },
  },
})

export default theme

// import {
//   unstable_createMuiStrictModeTheme as createMuiTheme,
//   ThemeProvider,
// } from '@material-ui/core'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import React from 'react'

// const Theme: React.FC = ({ children }) => {
//   // const { user } = useAppSelector((state) => state.auth);
//   const user = {
//     theme: 'theme',
//   }

//   const palletType = user?.theme === 'dark' ? 'dark' : 'light'

//   const theme = createMuiTheme({
//     palette: {
//       primary: {
//         main: '#3498db',
//       },
//     },
//   })

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {children}
//     </ThemeProvider>
//   )
// }

// export default Theme
