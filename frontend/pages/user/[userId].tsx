import {NextPage} from "next"
import Link from "next/link"

const postsUrl = `https://jsonplaceholder.typicode.com/posts`
const usersUrl = `https://jsonplaceholder.typicode.com/users`
const getUserPostsUrl = (userId: string) => `${postsUrl}?userId=${userId}`
const getUserUrl = (userId: string) => `${usersUrl}/${userId}`

interface Post {
  id: number
  title: string
}

interface User {
  userId: string
  name: string
  username: string
}

interface IProps {
  posts: Post[]
  user: User
}

const Post: NextPage<IProps> = ({posts, user: {name, username}}) => (
  <div>
    <Link href="/">
      <a>Back to home</a>
    </Link>
    <h1>
      {name} ({username})
    </h1>
    <h2>Posts by {name}</h2>
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
  </div>
)

Post.getInitialProps = async (ctx) => {
  const {userId} = ctx.query
  const postsResponse = await fetch(getUserPostsUrl(userId as string))
  const posts = await postsResponse.json()

  const userResponse = await fetch(getUserUrl(userId as string))
  const user = await userResponse.json()

  console.info(`user`, user)

  return {posts, user}
}

export default Post
