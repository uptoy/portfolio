import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((e) => console.log(e))
  }, [])
  return (
    <div className={styles.container}>
      <Head>
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
      </footer>
    </div>
  )
}
