import React, { useEffect, useState } from 'react'
import { VFC } from 'react'
import { Layout } from 'components/common/organisms/Layout'
import type { NextPage } from 'next'

import Link from 'next/link'
import Head from 'next/head'

import Counter from '../features/counter/Counter'

const Home: VFC = () => {
  return (
    <>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Counter />

      <p>counter</p>
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

export default Home
