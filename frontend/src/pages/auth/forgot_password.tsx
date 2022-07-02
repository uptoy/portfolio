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
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useAuth } from 'src/context/AuthContext'
import Link from '@mui/material/Link'
import { ForgotPasswordCredentials } from 'src/yup/type'
import { forgotPasswordFormSchema } from 'src/yup/schema'
import { CircularProgress } from '@mui/material';


const theme = createTheme()

export default function SignIn() {
  const router = useRouter()
  const { forgotPassword } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ForgotPasswordCredentials>({
    resolver: yupResolver(forgotPasswordFormSchema)
  })
  const handleForgotPassword: SubmitHandler<ForgotPasswordCredentials> = async (formData) => {
    try {
      setLoading(true)
      await forgotPassword(formData)
      setLoading(false)
      router.push('/')
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
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleForgotPassword)} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register('email')}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {loading ? <CircularProgress color="inherit" /> : <>Submit</>}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/auth/signup" variant="body2">
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
