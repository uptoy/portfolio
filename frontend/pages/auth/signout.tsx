import React from "react"
import Link from "next/link"
import { Layout } from "components/common/organisms"

const SignOutPage = () => {
  console.log("logout page")
  return (
    <Layout title="logout">
      <Link href="/">
        <a>Back to Top Page</a>
      </Link>
    </Layout>
  )
}

export default SignOutPage
