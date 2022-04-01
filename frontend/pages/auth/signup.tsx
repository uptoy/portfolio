import React, {useState} from "react"
import {
  Alert,
  CircularProgress,
  Avatar,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Checkbox,
  TextField,
  FormControlLabel,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Link from "components/Link"
import {makeStyles} from "@material-ui/styles"
import Copyright from "components/Copyright"
import theme from "theme"
import {signup} from "features/auth/slice"
import {useAppDispatch} from "app/hooks"
import toast from "react-hot-toast"
import {useForm, Controller} from "react-hook-form"
import {unwrapResult} from "@reduxjs/toolkit"
import {useRouter} from "next/router"

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

interface FormData {
  email: string
  password: string
  password_confirmation: string
  name: string
}

const defaultValues = {
  email: "",
  password: "",
  name: "",
}

export default function SignUp() {
  const router = useRouter()
  const classes = useStyles()

  const {handleSubmit, control, watch} = useForm<FormData>({
    defaultValues,
  })

  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const passwordFieldValue = watch("password")

  const onSubmit = async ({email, password, name, password_confirmation}: FormData) => {
    try {
      setIsSubmitting(true)
      const result = await dispatch(signup({name, email, password, password_confirmation}))
      unwrapResult(result)
      setIsSubmitting(false)
      toast.success("Successfully Registered!")
      router.push("/dashboard")
    } catch (error) {
      setError(error.message)
      if (error.errors) setFieldErrors(error.errors)
      setIsSubmitting(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Name is required field",
                }}
                render={({field: {onChange}, fieldState: {error}}) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChange}
                    id="name"
                    label="Name"
                    name="name"
                    type="name"
                    error={Boolean(error)}
                    helperText={error?.message || fieldErrors["name"]}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                render={({field: {onChange}, fieldState: {error}}) => (
                  <TextField
                    margin="normal"
                    required
                    onChange={onChange}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={Boolean(error || fieldErrors["email"])}
                    helperText={error?.message || fieldErrors["email"]}
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
                render={({field: {onChange}, fieldState: {error}}) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChange}
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    error={Boolean(error || fieldErrors["password"])}
                    helperText={error?.message || fieldErrors["password"]}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password_confirmation"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password Confirmation is required field.",
                  validate: (value) =>
                    value === passwordFieldValue || "The passwords do not match.",
                }}
                render={({field: {onChange}, fieldState: {error}}) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChange}
                    id="password_confirm"
                    label="Confirm Password"
                    name="password_confirm"
                    type="password"
                    error={Boolean(error || fieldErrors["password_confirm"])}
                    helperText={error?.message || fieldErrors["password_confirm"]}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
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
            {isSubmitting ? <CircularProgress size={30} /> : "Signup"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
