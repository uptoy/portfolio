// import { TypographyStyle } from "@material-ui/core/styles";
import {grey, pink} from "@material-ui/core/colors"
import {createStyles, Theme} from "@material-ui/core/styles"
import {StyleRules} from "@material-ui/styles"
const pink500 = pink["500"]
const grey600 = grey["600"]

const styles: (theme: Theme) => StyleRules<any> = (theme) =>
  createStyles({
    root: {},
    app: {
      textAlign: "center",
    },
    navigation: {
      fontSize: 15,
      fontWeight: 500,
      color: grey600,
      paddingBottom: 15,
      display: "block",
    },
    title: {
      fontSize: 24,
      fontWeight: 500,
      marginBottom: 20,
    },
    paper: {
      padding: 30,
    },
    clear: {
      clear: "both",
    },
  })

export const listPageStyle = {
  fab: {
    top: "auto",
    right: 20,
    left: "auto",
    bottom: 10,
    position: "fixed",
    marginRight: 20,
    backgroundColor: pink500, // {pink500}
  },
  fabSearch: {
    top: "auto",
    right: 100,
    bottom: 10,
    left: "auto",
    position: "fixed",
    marginRight: 20,
    backgroundColor: "lightblue",
  },
  searchButton: {
    marginRight: 20,
  },
  drawer: {
    backgroundColor: "lightgrey",
  },
  searchDrawer: {
    overflow: "hidden",
    width: 280,
  },
  searchGrid: {
    width: 250,
  },
  searchField: {
    margin: 10,
  },
}

export const formPageStyles = {
  buttons: {
    marginTop: 30,
    float: "right",
  },
  saveButton: {
    marginLeft: 5,
  },
  card: {
    width: 120,
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5,
  },
  container: {
    marginTop: "2em",
  },
  cell: {
    padding: "1em",
  },
  productList: {
    color: "navy",
    paddingTop: 20,
    fontWeight: "bold",
  },
  textField: {
    marginLeft: 4, // theme.spacing(1),
    marginRight: 4, //theme.spacing(1),
    width: "100%",
  },
}

export default styles
