import React from 'react'
import Link from 'next/link'

export default function ForgotPassword() {
  return (
    <>
      <p>forgot password</p>
      <Link href="/">
        <a>ホームに戻る</a>
      </Link>
      <Link href="/">
        <a>パスワードを忘れた場合</a>
      </Link>
    </>
  )
}
