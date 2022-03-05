import React from 'react'
import {FormControlLabel,Avatar,Button,Checkbox,Grid,Container,Box,TextField,Typography} from "@material-ui/core"
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from 'components/Link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Copyright from 'components/Copyright'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

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
    width: '100%',
    marginTop: 10,
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/forgot_password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/auth/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
