import React, { ReactChild } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from 'src/theme'
import 'src/styles/globals.css'
import { RecoilRoot } from 'recoil'
import ContextProvider from 'src/context'
import { Toaster } from 'react-hot-toast'
import makeStyles from '@material-ui/styles/makeStyles'
import { Theme } from '@emotion/react'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  const useGlobalStyles = makeStyles({
    '@global': {
      body: {
        backgroundColor: '#f5f6f6'
      }
    }
  })
  function MyThemeProvider({ children, theme }: { children: ReactChild; theme: Theme }) {
    useGlobalStyles()
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

  return (
    <React.Fragment>
      <Toaster />
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MyThemeProvider theme={theme}>
        <ContextProvider>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </ContextProvider>
      </MyThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
