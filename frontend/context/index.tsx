import React from "react"

// import PageContext from "./PageContext"
import PageCountContext from "./PageCountContext"
import {AuthProvider} from "./AuthContext"

const ContextProvider = ({children}: any) => (
  // <PageContext>
  <AuthProvider>
    <PageCountContext>{children}</PageCountContext>
  </AuthProvider>
  // </PageContext>
)

export default ContextProvider
