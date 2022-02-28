import Link from "next/link"
import { Layout } from "components/common/organisms/Layout"
// import { getAllPostIds, getPostData } from "lib/fetch"
// import { Post } from "types"
import { GetStaticProps, GetStaticPaths } from "next"
import { useSelector } from "react-redux"
import { IParams, IBlog } from "types"
import { RootState } from "app/store"
import { useRouter } from "next/router"

const PostDetail: React.FC<IBlog> = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <Layout title="post_detail">
      {/* <div>
        {tags &&
          tags.map((tag, i) => (
            <span
              className={`px-2 py-2 m-1 text-white rounded ${
                i === 0
                  ? "bg-blue-500"
                  : i === 1
                  ? "bg-gray-500"
                  : i === 2
                  ? "bg-green-500"
                  : i === 3
                  ? "bg-yellow-500"
                  : i === 4
                  ? "bg-indigo-500"
                  : "bg-gray-400"
              }`}
              key={tag.id}
            >
              {tag.name}
            </span>
          ))}
      </div>
      <p className="m-10 text-xl font-bold">{title}</p>
      <p className="mx-10 mb-12">{content}</p>
      <p>{created_at}</p>
      <p className="mt-3">
        {"by "} {username}
      </p>
      <Link href="/posts/">
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <a data-testid="back-blog">Back to blog-page</a>
        </div> */}
      {/* </Link> */}
    </Layout>
  )
}
export default PostDetail

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = await getAllPostIds()
//   return {
//     paths,
//     fallback: true
//   }
// }

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   //const { post: post } = await getPostData(ctx.params.id as string)
//   const post: Post = await getPostData(ctx.params!.id as string)
//   return {
//     props: {
//       ...post
//     },
//     revalidate: 3
//   }
// }
