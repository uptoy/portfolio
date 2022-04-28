import { SyntheticEvent, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import { RouteComponentProps } from 'react-router'
import FormContainer from '../components/FormContainer'
import { useRouter } from 'next/router'

const LoginScreen = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const userInfo: any = localStorage.getItem('userInfo')
  // useEffect(() => {
  //   // if (userInfo !== undefined && userInfo?.firstName) {
  //     router.push('/')
  //   // }
  // }, [])

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
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
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="my-3">
          Login
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen

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
