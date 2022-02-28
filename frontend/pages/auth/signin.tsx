import React from 'react'
import Link from 'next/link'

export default function SignIn() {
  return (
    <>
      <p>SignIn</p>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Link href="/">
        <a>パスワードを忘れた場合</a>
      </Link>
    </>
  )
}
