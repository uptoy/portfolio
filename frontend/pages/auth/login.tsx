import { SubmitHandler, useForm } from 'react-hook-form'
import React, { SyntheticEvent, useState, useEffect } from 'react'
import { SignInCredentials } from 'yup/type'
import { signInFormSchema } from 'yup/schema'
import { yupResolver } from '@hookform/resolvers/yup'
// import { useAuth } from 'context/AuthContext'
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
} from '@material-ui/core'
// import { useAuth } from 'context/AuthContext'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Link from 'components/Link'
import { makeStyles } from '@material-ui/styles'
import Copyright from 'components/Copyright'
import theme from 'theme'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignIn() {
  const classes = useStyles()
  const router = useRouter()
  // const { signIn } = useAuth()
  // const [loading, setLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInCredentials>({
    resolver: yupResolver(signInFormSchema),
  })
  // const handleSignIn: SubmitHandler<SignInCredentials> = async (formData) => {
  //   // setLoading(true)
  //   await signIn(formData)
  //   // setLoading(false)
  // }
  const handleSignIn: SubmitHandler<SignInCredentials> = async ({
    email,
    password,
  }: any) => {
    // e.preventDefault()
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()
    const userData = { firstName: data.first_name, lastName: data.last_name }
    console.log('userData', userData)
    router.push('/')
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
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(handleSignIn)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email')}
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
            {...register('password')}
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

// import { SyntheticEvent, useState, useEffect } from 'react'
// import { Form, Button } from 'react-bootstrap'
// // import { useDispatch, useSelector } from 'react-redux'
// // import { RouteComponentProps } from 'react-router'
// import { useRouter } from 'next/router'
// import { Container, Row, Col } from 'react-bootstrap'

// const FormContainer = ({ children }: any) => {
//   return (
//     <Container className='py-3'>
//       <Row className='justify-content-md-center'>
//         <Col xs={12} md={6}>
//           {children}
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// const LoginScreen = () => {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   // const userInfo: any = localStorage.getItem('userInfo')
//   // useEffect(() => {
//   //   // if (userInfo !== undefined && userInfo?.firstName) {
//   //     router.push('/')
//   //   // }
//   // }, [])

//   const submitHandler = async (e: SyntheticEvent) => {
//     e.preventDefault()
//     const response = await fetch('http://localhost:8080/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })
//     const data = await response.json()
//     const userData = { firstName: data.first_name, lastName: data.last_name }
//     console.log('userData', userData)
//     router.push('/')
//   }

//   return (
//     <FormContainer>
//       <h1>Login</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="email" className="my-3">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="password" className="my-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" className="my-3">
//           Login
//         </Button>
//       </Form>
//     </FormContainer>
//   )
// }

// export default LoginScreen

// export const login = async (email: String, password: String) => {
//   try {
//     const response = await fetch('http://localhost:8081/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })

//     const data = await response.json()
//     const userData = { firstName: data.first_name, lastName: data.last_name }
//     localStorage.setItem('userInfo', JSON.stringify(userData))
//   } catch (error) {}
// }
// import { UserState } from '../reducers/userReducers'
// import { RootState } from '../store'

// interface Props {
//   history: RouteComponentProps['history']
// }
