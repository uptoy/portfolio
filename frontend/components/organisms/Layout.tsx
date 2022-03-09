import React from "react"
import { Container } from "@material-ui/core"
import Header from "./Header"
import Footer from "./Footer"

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  )
}

export default Layout
