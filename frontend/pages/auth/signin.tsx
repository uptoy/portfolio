import {
  Typography,
  Container,
  Grid,
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  TextField,
  Avatar,
  Button,
  Alert,
} from "@material-ui/core"
import Link from "components/Link"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Copyright from "components/Copyright"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import React, {useState} from "react"
import {signin} from "features/auth/authSlice"

import {useAppDispatch} from "app/hooks"
import toast from "react-hot-toast"
import {useForm, Controller} from "react-hook-form"
import {unwrapResult} from "@reduxjs/toolkit"
import Router from "next/router"

const useStyles = makeStyles(() => ({
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
  alertContainer: {
    marginTop: 20,
    width: "100%",
  },
}))

interface FormData {
  email: string
  password: string
}

const defaultValues = {
  email: "",
  password: "",
}

export default function SignIn() {
  const classes = useStyles()

  const {handleSubmit, control} = useForm<FormData>({
    defaultValues,
  })

  const dispatch = useAppDispatch()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async ({email, password}: FormData) => {
    try {
      setIsSubmitting(true)
      const result = await dispatch(signin({email, password}))
      unwrapResult(result)
      setIsSubmitting(false)
      toast.success("Successfully logged in!")
      Router.push("/")
    } catch (error) {
      setError(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Alert severity="error" className={classes.alertContainer}>
          {error}
        </Alert>
      )}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required field",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                    margin="normal"
                    required
                    onChange={onChange}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={Boolean(error)}
                    helperText={error?.message}
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password is required field",
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChange}
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    error={Boolean(error)}
                    helperText={error?.message}
                    value={value}
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={30} /> : "Sign In"}
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
