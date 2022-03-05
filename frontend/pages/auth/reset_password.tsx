import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Avatar,Button,Container,Box,TextField,Typography} from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import Copyright from 'components/Copyright'

const useStyles: any = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 'auto',
    marginBottom: 20,
    backgroundColor: '#19857b',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 1,
  },
  submit: {
    margin: 3,
  },
}))

export default function SignIn() {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_password"
            label="New Password"
            type="password"
            id="new_password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="confirm_password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
