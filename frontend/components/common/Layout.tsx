import React from 'react'

import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }: any) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

export default Layout
