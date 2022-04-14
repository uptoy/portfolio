import React, {useState} from "react"
import {
  CircularProgress,
  Alert,
  Avatar,
  Grid,
  Button,
  Container,
  Box,
  TextField,
  Typography,
} from "@material-ui/core"
import {useForm, Controller} from "react-hook-form"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Copyright from "components/Copyright"
import Link from "components/Link"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import toast from "react-hot-toast"
import {forgotPassword} from "features/auth/authApi"

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface FormData {
  email: string
}

const defaultValues = {
  email: "",
}

export default function ForgotPassword() {
  const classes = useStyles()

  const {handleSubmit, control, reset} = useForm<FormData>({
    defaultValues,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async ({email}: FormData) => {
    try {
      setIsSubmitting(true)
      // await getCSRFCookie()
      await forgotPassword(email)

      setIsSubmitting(false)
      toast.success("Successfully sent your password reset link!")
      reset({email: ""})
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
          Forgot Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
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
                autoFocus
                error={Boolean(error)}
                helperText={error?.message}
                value={value}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={30} /> : "Submit"}
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
