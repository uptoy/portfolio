import React from "react"
import { Container } from "@material-ui/core"
import MypageHeader from ".//MypageHeader"
import MypageFooter from "./MypageFooter"

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <MypageHeader />
      <Container maxWidth="lg">
        <main>{children}</main>
      </Container>
      <MypageFooter />
    </>
  )
}

export default DashboardLayout
