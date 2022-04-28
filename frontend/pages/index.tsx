import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import { useState, useEffect } from 'react'

const Home = () => {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('http://localhost:8080/api/auth/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const posts = await response.json()
      console.log('posts', posts)
      setData(posts)
    }
    fetchPost()
  }, [])

  // console.log('data', data)
  // const { userInfo } = userLogin
  // const firstName = userInfo ? userInfo.firstName : null

  return (
    <div>
      <Header />
      {data?.email}
      <div></div>
      {/* {firstName ? (
        <h1>Welcome {firstName}</h1>
      ) : (
        <h1>Welcome to the Home Page!</h1>
      )} */}
    </div>
  )
}

export default Home

// const result = await fetch(
//   'http://hn.algolia.com/api/v1/search?query=redux',
// )

// setData(result.json())
// const fetchData = async () => {
//   const result = await fetch(
//     'http://hn.algolia.com/api/v1/search?query=redux',
//   )
//   setData(result.json())
// }

// fetchData()
// fetch('http://localhost:8081/api/user')
//   .then((response) => response.json())
//   .then(
//     (data) => {
//       setData(data)
//     },
//     [data],
//   )

// import Footer from '../components/Footer'

// const Home: NextPage = () => {
//   return (
//     <div className={styles.container}>
//     </div>
//   )
// }

// export default Home

// import { useSelector } from 'react-redux'
// import { UserState } from '../reducers/userReducers'
// import { RootState } from '../store'

// const userLogin = useSelector<RootState, UserState>(
//   (state: RootState) => state.userLogin
// )

// useEffect(() => {
//   // if (userInfo !== undefined && userInfo?.firstName) {
//   const response = fetch('http://localhost:8081/api/user', {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//   })
//   // }
// }, [])
