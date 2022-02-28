import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Counter } from '../features/counter/Counter'

export default function Home() {
  return (
    <>
    <p>counter</p>
      <Counter />
      <Link href="/auth/signin">
        <a>ログイン</a>
      </Link>
      <Link href="/auth/signup">
        <a>新規会員登録はこちら</a>
      </Link>
      <Link href="/auth/signout">
        <a>ログアウト</a>
      </Link>
      <Link href="/auth/forgot_password">
        <a>パスワードを忘れた場合</a>
      </Link>
      <Link href="/auth/reset_password">
        <a>パスワードをリセットする</a>
      </Link>
    </>
  )
}
