import {SubmitHandler, useForm} from "react-hook-form"
import React from "react"
import {SignInCredentials} from "yub/type"
import {signInFormSchema} from "yub/schema"
import {yupResolver} from "@hookform/resolvers/yup"
import {useAuth} from "context/AuthContext"
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Typography,
  Container,
  Box,
  Grid,
  Checkbox,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Link from "components/Link"
import {makeStyles} from "@material-ui/styles"
import Copyright from "components/Copyright"
import theme from "theme"

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignIn() {
  const classes = useStyles()
  const {signIn} = useAuth()
  // const [loading, setLoading] = useState(false)
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<SignInCredentials>({
    resolver: yupResolver(signInFormSchema),
  })
  const handleSignIn: SubmitHandler<SignInCredentials> = async (formData) => {
    // setLoading(true)
    await signIn(formData)
    // setLoading(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(handleSignIn)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
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
