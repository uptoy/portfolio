import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'

export default function Post() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((e) => console.log(e))
  }, [])
  return (
    <>
      <p></p>
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


{
  /* <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
        <div key={post.id}><h2>{post.title}</h2>
        <div>author {post.author.name}</div>
        <div>author {post.author.created_at}</div>
        <div>author {post.author.updatedt_at}</div>

        </div>
        ))}
      </main>

      <footer className={styles.footer}>
        <a>
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */
}
