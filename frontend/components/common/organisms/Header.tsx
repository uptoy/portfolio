import React from "react"
import Link from "next/link"

export const Header = React.memo(() => {
  console.log("Header component")
  return (
    <header>
      <nav className="bg-gray-800 w-screen">
        <div className="flex items-center pl-8 h-14">
          <div className="flex space-x-4">
            <Link href="/">
              <a
                data-testid="home-nav"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                Home
              </a>
            </Link>
            <Link href="/auth/signup">
              <a
                data-testid="link1-nav"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                SignUp
              </a>
            </Link>
            <Link href="/auth/signin">
              <a
                data-testid="link2-nav"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                Signin
              </a>
            </Link>
            <Link href="/auth/logout">
              <a
                data-testid="link3-nav"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                Logout
              </a>
            </Link>
            <Link href="/dashboard">
              <a
                data-testid="link4-nav"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                Dashboard
              </a>
            </Link>
            <Link href="/auth/reset_password">
              <a
                data-testid="link5-nav"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                Reset Password
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
})
