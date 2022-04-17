import Link from "next/link"
import useSWR from "swr"
import {useState} from "react"

const postsUrl = `https://jsonplaceholder.typicode.com/posts`
const usersUrl = `https://jsonplaceholder.typicode.com/users`

const Users = (users: any) => (
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

const getUsers = (url: any) => fetch(url).then((_) => _.json())

const PostList = (posts: any) => {
  const [shouldFetchUsers, setShouldFetchUsers] = useState(false)
  const {data: users} = useSWR(() => (shouldFetchUsers ? usersUrl : null), getUsers)
  return (
    <>
      <section>
        <button onClick={() => setShouldFetchUsers(true)}>Users?</button>
        <h1>Posts</h1>
        <ul>
          {posts.map((post: any) => (
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
      {users && <Users users={users} />}
    </>
  )
}

PostList.getInitialProps = async function () {
  const postsResponse = await fetch(postsUrl)
  const posts = (await postsResponse.json()).slice(0, 5)
  const usersResponse = await fetch(usersUrl)
  const users = (await usersResponse.json()).slice(0, 5)
  return {posts, users}
}

export default PostList

// import React from "react"
// import Button from "@material-ui/core/Button"
// import Card from "@material-ui/core/Card"
// import CardActions from "@material-ui/core/CardActions"
// import CardContent from "@material-ui/core/CardContent"
// import CardMedia from "@material-ui/core/CardMedia"
// import CssBaseline from "@material-ui/core/CssBaseline"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
// import {makeStyles} from "@material-ui/styles"
// import Container from "@material-ui/core/Container"
// import {ProductHeader, Footer} from "components/organisms"
// import theme from "theme"

// const useStyles: any = makeStyles(() => ({
//   icon: {
//     marginRight: theme.spacing(2),
//   },
//   heroContent: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(8, 0, 6),
//   },
//   heroButtons: {
//     marginTop: theme.spacing(4),
//   },
//   cardGrid: {
//     paddingTop: theme.spacing(8),
//     paddingBottom: theme.spacing(8),
//   },
//   card: {
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//   },
//   cardMedia: {
//     paddingTop: "56.25%", // 16:9
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
// }))

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// export default function Album() {
//   const classes = useStyles()

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <ProductHeader />

//       <main>
//         {/* Hero unit */}
//         <div className={classes.heroContent}>
//           <Container maxWidth="sm">
//             <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
//               Album layout
//             </Typography>
//             <Typography variant="h5" align="center" color="textSecondary" paragraph>
//               Something short and leading about the collection below—its contents, the creator, etc.
//               Make it short and sweet, but not too short so folks don&apos;t simply skip over it
//               entirely.
//             </Typography>
//             <div className={classes.heroButtons}>
//               <Grid container spacing={2} justifyContent="center">
//                 <Grid item>
//                   <Button variant="contained" color="primary">
//                     Main call to action
//                   </Button>
//                 </Grid>
//                 <Grid item>
//                   <Button variant="outlined" color="primary">
//                     Secondary action
//                   </Button>
//                 </Grid>
//               </Grid>
//             </div>
//           </Container>
//         </div>
//         <Container className={classes.cardGrid} maxWidth="md">
//           {/* End hero unit */}
//           <Grid container spacing={4}>
//             {cards.map((card) => (
//               <Grid item key={card} xs={12} sm={6} md={4}>
//                 <Card className={classes.card}>
//                   <CardMedia
//                     className={classes.cardMedia}
//                     image="https://source.unsplash.com/random"
//                     title="Image title"
//                   />
//                   <CardContent className={classes.cardContent}>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       Heading
//                     </Typography>
//                     <Typography>
//                       This is a media card. You can use this section to describe the content.
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button size="small" color="primary">
//                       View
//                     </Button>
//                     <Button size="small" color="primary">
//                       Edit
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </main>
//       <Footer />
//     </React.Fragment>
//   )
// }
