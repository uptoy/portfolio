import {SubmitHandler, useForm} from "react-hook-form"
import React, {useState} from "react"
import {SignUpCredentials} from "yup/type"
import {signUpFormSchema} from "yup/schema"
import {yupResolver} from "@hookform/resolvers/yup"
import {useAuth} from "context/AuthContext"
import toast from "react-hot-toast"
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
import {useRouter} from "next/router"
import {api} from "services/apiClient"

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
  const router = useRouter()
  const {signUp, me} = useAuth()
  const [loading, setLoading] = useState(false)
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm<SignUpCredentials>({
    resolver: yupResolver(signUpFormSchema),
  })
  const handleSignUp: SubmitHandler<SignUpCredentials> = async (formData) => {
    try {
      setLoading(true)
      await signUp(formData)
      toast.success("Successfully category deleted")
      router.push("/")
      setLoading(false)
    } catch (error) {
      toast.error(
        "Sorry we were'nt able to delete this category right now. Please try again later."
      )
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
        <form noValidate onSubmit={handleSubmit(handleSignUp)} style={{marginTop: "1em"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Name"
                autoComplete="email"
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password Confirm"
                type="password"
                id="password_confirm"
                {...register("confirmPassword")}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
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
