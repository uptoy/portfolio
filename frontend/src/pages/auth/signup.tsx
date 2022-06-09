import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignUpCredentials } from 'src/yup/type'
import { signUpFormSchema } from 'src/yup/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { Avatar, Button, TextField, Typography, Container, Box, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Link from 'src/components/Link'
import { makeStyles } from '@material-ui/styles'
import Copyright from 'src/components/Copyright'
import theme from 'src/theme'
import { useRouter } from 'next/router'
import { useAuth } from 'src/context/AuthContext'

const useStyles: any = makeStyles(() => ({
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

export default function SignUp() {
  const classes = useStyles()
  const router = useRouter()
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)
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
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form noValidate onSubmit={handleSubmit(handleSignUp)} style={{ marginTop: '1em' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth label="Username" {...register('username')} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register('email')}
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
                {...register('password')}
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
                {...register('confirmPassword')}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
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

// const SignupScreen = () => {
//   const router = useRouter()
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const submitHandler = async (e: SyntheticEvent) => {}

//   return (
//     <FormContainer>
//       <h1 className="my-3">Sign Up</h1>
//       <Form onSubmit={submitHandler} className="py-3">
//         <Form.Group controlId="name" className="my-3">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="name"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="email" className="my-3">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter your email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="password" className="my-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" className="my-3">
//           Sign Up
//         </Button>
//       </Form>
//     </FormContainer>
//   )
// }

// export default SignupScreen
