import { SyntheticEvent } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
// import { useSelector, useDispatch } from 'react-redux'
// import { UserState } from '../reducers/userReducers'
// import { RootState } from '../store'
// import { logout } from '../actions/userActions'

const Header = () => {
  // const dispatch = useDispatch()
  // const userLogin = useSelector<RootState, UserState>(
  //   (state: RootState) => state.userLogin
  // )
  // const userInfo: any = localStorage?.getItem('userInfo')

  const logoutHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    await fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">Go React Auth</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/signup">
              <button>Sign Up</button>
            </Nav.Link>
            <Nav.Link href="/login">
              <button>Login</button>
            </Nav.Link>
            <Nav.Link onClick={logoutHandler}>
              <button>Logout</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
