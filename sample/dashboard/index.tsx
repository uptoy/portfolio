// import { useEffect } from 'react'
// import Router from 'next/router'
// import Nav from '../../components/nav'
// import useUser from '../../../sample/data/use-user'
// import { logout } from 'libs/auth'

// export default function Dashboard() {
//   const { user, loading, loggedOut, mutate } = useUser()

//   // if logged out, redirect to the homepage
//   useEffect(() => {
//     if (loggedOut) {
//       Router.replace('/')
//     }
//   }, [loggedOut])
//   if (loggedOut) return 'redirecting...'

//   return (
//     <div>
//       <Nav title="ACME Dashboard" />
//       <main>
//         {loading ? (
//           'loading...'
//         ) : (
//           <>
//             <h1>Welcome, {user?.name}</h1>
//             <p>This is your dashboard.</p>
//             <button
//               onClick={() => {
//                 logout()
//                 mutate()
//                 Router.replace('/')
//               }}
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </main>
//     </div>
//   )
// }
