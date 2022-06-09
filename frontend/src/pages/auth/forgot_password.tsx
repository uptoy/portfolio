import { SubmitHandler, useForm } from 'react-hook-form'
import React from 'react'
import { ForgotPasswordCredentials } from 'src/yup/type'
import { forgotPasswordFormSchema } from 'src/yup/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/context/AuthContext'
import { Avatar, Button, TextField, Typography, Container, Box, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Link from 'src/components/Link'
import { makeStyles } from '@material-ui/styles'
import Copyright from 'src/components/Copyright'
import theme from 'src/theme'

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function ForgotPassword() {
  const classes = useStyles()
  const { forgotPassword } = useAuth()
  // const [loading, setLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ForgotPasswordCredentials>({
    resolver: yupResolver(forgotPasswordFormSchema)
  })
  const handleForgotPassword: SubmitHandler<ForgotPasswordCredentials> = async (formData) => {
    // setLoading(true)
    await forgotPassword(formData)
    // setLoading(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(handleForgotPassword)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            // name="email"
            autoComplete="email"
            autoFocus
            {...register('email')}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Submit
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/signin" variant="body2">
                Already have an account?
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
