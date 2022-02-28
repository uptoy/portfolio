import React, { VFC } from 'react'
import { useAppSelector } from 'app/hooks'
import SignInPage from 'pages/auth/signin'
import { Layout } from 'components/common/organisms'
import SignUpPage from 'pages/auth/signup'

const ProfilePage: VFC = () => {
  const { user } = useAppSelector((state) => state.auth)
  console.log('Profile page')

  if (!user) return <SignInPage />
  return (
    <Layout title="ProfilePage">
      <div>profile</div>
    </Layout>
  )
}

export default ProfilePage
