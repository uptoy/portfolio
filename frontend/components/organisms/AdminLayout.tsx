import react from 'react'
import Header from 'components/Header'
import Copyright from 'components/Copyright'

const AdminLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Copyright />
    </>
  )
}

export default AdminLayout
