import Link from "next/link"
import useSWR from "swr"
import {NextPage} from "next"
import {useState} from "react"

const postsUrl = `https://jsonplaceholder.typicode.com/posts`
const usersUrl = `https://jsonplaceholder.typicode.com/users`

interface User {
  id: number
  name: number
  username: number
}
interface Post {
  id: number
  title: number
  body: number
}

interface IProps {
  users: User[]
}

const Users: NextPage<IProps> = ({users}) => (
  <section>
    <h1>Users</h1>
    <ul>
      {users.map((user: any) => (
        <li key={user.id}>
          <Link href={`/user/[userId]`} as={`/user/${user.id}`}>
            <a>
              {user.id} - {user.name} ({user.username})
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

const getUsers = (url: string) => fetch(url).then((_: any) => _.json())


interface IProps {
  posts: Post[]
}


const Index: NextPage<IProps> = ({posts}) => {
  const [shouldFetchUsers, setShouldFetchUsers] = useState(false)
  const {data: users} = useSWR(() => (shouldFetchUsers ? usersUrl : null), getUsers)
  return (
    <>
      <section>
        <button onClick={() => setShouldFetchUsers(true)}>Users?</button>
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.title}>
              <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                <a>
                  {post.id} - {post.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {users && <Users users={users} posts={[]}  />}
    </>
  )
}

Index.getInitialProps = async function () {
  const postsResponse = await fetch(postsUrl)
  const posts: Post[] = (await postsResponse.json()).slice(0, 5)
  const usersResponse = await fetch(usersUrl)
  const users: User[] = (await usersResponse.json()).slice(0, 5)
  return {posts, users}
}

export default Index
