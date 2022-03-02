import React, { VFC } from 'react'
import { useAppSelector } from 'app/hooks'
import SignInPage from 'pages/auth/signin'
import { Layout } from 'components/common/organisms'

const DashboardPage: VFC = () => {
  const { user } = useAppSelector((state) => state.auth)

  if (!user) return <SignInPage />
  return (
    <Layout title="DashboaedPage">
      <div>dashboard</div>
    </Layout>
  )
}

export default DashboardPage

// import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import GoalForm from '../components/'
// import GoalItem from '../components/GoalItem'
// import Spinner from '../components/Spinner'
// import { getGoals, reset } from '../features/goals/goalSlice'

// function Dashboard() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   //   const { user } = {user:user}
//   // // const { user } = useSelector((state) => state?.auth)
//   // const { goals, isLoading, isError, message } = useSelector(
//   //   // (state) => state.goals
//   // )

//   useEffect(() => {
//     if (isError) {
//       console.log(message)
//     }

//     if (!user) {
//       navigate('/login')
//     }

//     dispatch(getGoals())

//     return () => {
//       dispatch(reset())
//     }
//   }, [user, navigate, isError, message, dispatch])

//   if (isLoading) {
//     return <Spinner />
//   }

//   return (
//     <>
//       <section className='heading'>
//         <h1>Welcome {user && user.name}</h1>
//         <p>Goals Dashboard</p>
//       </section>

//       <GoalForm />

//       <section className='content'>
//         {goals.length > 0 ? (
//           <div className='goals'>
//             {goals.map((goal) => (
//               <GoalItem key={goal._id} goal={goal} />
//             ))}
//           </div>
//         ) : (
//           <h3>You have not set any goals</h3>
//         )}
//       </section>
//     </>
//   )
// }
