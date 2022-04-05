import React from "react"
import {
  FormControlLabel,
  Avatar,
  Button,
  Checkbox,
  Grid,
  Container,
  Box,
  TextField,
  Typography,
} from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import Link from "@material-ui/core/Link"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Copyright from "components/Copyright"
import { makeStyles } from "@material-ui/styles"
import theme from "theme"

const useStyles: any = makeStyles(() => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignUp() {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Product Delete
        </Typography>
        <Typography component="h5" variant="h5">
          Do you Delete This Product ?
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Delete
        </Button>
      </div>
    </Container>
  )
}
