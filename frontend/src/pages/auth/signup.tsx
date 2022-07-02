import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignUpCredentials } from 'src/yup/type'
import { signUpFormSchema } from 'src/yup/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useAuth } from 'src/context/AuthContext'
import Link from '@mui/material/Link'
// import Link from '@mui/material/Link'
// import Link from 'src/components/Link'

const theme = createTheme()

export default function SignIn() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignUpCredentials>({
    resolver: yupResolver(signUpFormSchema)
  })
  const handleSignUp: SubmitHandler<SignUpCredentials> = async (formData) => {
    try {
      setLoading(true)
      await signUp(formData)
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log('Failed', err.message)
      } else {
        console.log('Unknown Failure', err)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleSignUp)} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register('email')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...register('password')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...register('password')}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
