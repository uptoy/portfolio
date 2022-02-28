import '../styles/globals.css'
import store from '../app/store'
import { Provider } from 'react-redux'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { GetCurrentUser, SignOut } from 'features/auth/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const getCurrentUser = async () => {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        return
      }
      try {
        const response = await dispatch(GetCurrentUser())
        unwrapResult(response)
      } catch (error) {
        dispatch(SignOut())
      }
    }
    getCurrentUser()
  }, [dispatch])

  // useEffect(() => { if (user) {
  //     dispatch())
  //   }
  // }, [user, dispatch])

  function MyApp({ Component, pageProps }: AppProps) {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default MyApp
