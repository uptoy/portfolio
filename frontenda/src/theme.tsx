import {createTheme} from "@material-ui/core/styles"
import {Theme} from "@material-ui/core/styles"
import {yellow, red, common} from "@material-ui/core/colors"

// Create a theme instance.
const theme: Theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#2979ff",
    },
    // error: {
    //   main: '#19857b',
    // },
    warning: {
      main: red[500],
    },
    info: {
      main: yellow[700],
    },
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
