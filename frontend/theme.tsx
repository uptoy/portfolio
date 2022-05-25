import {createTheme} from "@material-ui/core/styles"
import {Theme} from "@material-ui/core/styles"
import {yellow, red, common} from "@material-ui/core/colors"

const theme: Theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#2979ff",
    },
    warning: {
      main: red[500],
    },
    info: {
      main: yellow[700],
    },
    background: {
      default: common.white,
    },
  },
})

export default theme
