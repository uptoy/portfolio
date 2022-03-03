import react from 'react'
import Header from 'components/Header'
import Copyright from 'components/Copyright'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Copyright />
    </>
  )
}

export default Layout
