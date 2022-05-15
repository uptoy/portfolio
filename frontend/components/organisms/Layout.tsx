import React from "react"
import {Container} from "@material-ui/core"
import ProductHeader from "./ProductHeader"
import Footer from "./Footer"

const Layout: React.FC = ({children}) => {
  return (
    <>
      <ProductHeader />
      <Container maxWidth="lg" style={{padding: 10}}>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  )
}

export default Layout
