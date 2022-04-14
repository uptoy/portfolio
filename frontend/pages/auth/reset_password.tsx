import React, {useState} from "react"
import {
  CircularProgress,
  Alert,
  Avatar,
  Button,
  Container,
  Box,
  TextField,
  Typography,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import theme from "theme"
import {makeStyles} from "@material-ui/styles"
import Copyright from "components/Copyright"
import {useForm, Controller} from "react-hook-form"
import toast from "react-hot-toast"
import {resetPassword} from "features/auth/authApi"
import Router, {useRouter} from "next/router"

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
  password_confirm: string
}
const defaultValues = {
  email: "",
  password: "",
  password_confirm: "",
}

export default function SignIn() {
  const classes = useStyles()
  const {handleSubmit, control, watch} = useForm<FormData>({
    defaultValues,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  //app/example/?token=adfasfjalelalnlneacsd
  const query = router.query
  const token = query.token as string
  const passwordFieldValue = watch("password")
  const onSubmit = async (fields: FormData) => {
    try {
      setIsSubmitting(true)
      // await getCSRFCookie()
      await resetPassword({...fields, token})
      setIsSubmitting(false)
      toast.success("Successfully reset your password")
      Router.push("/signin")
    } catch (error) {
      setError(error.response.data.message)
      if (error.response.data.errors) setFieldErrors(error.response.data.errors)
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
          Reset Password
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
                error={Boolean(error)}
                helperText={error?.message}
                value={value}
              />
            )}
          />

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

          <Controller
            name="password_confirm"
            control={control}
            defaultValue=""
            rules={{
              required: "Password Confirmation is required field.",
              validate: (value) => value === passwordFieldValue || "The passwords do not match.",
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={30} /> : "Submit"}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
