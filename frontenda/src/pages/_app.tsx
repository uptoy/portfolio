import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'src/theme'
import createEmotionCache from 'src/createEmotionCache'
import { RecoilRoot } from 'recoil'
import ContextProvider from 'src/context'
// import { Toaster } from 'react-hot-toast'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </ContextProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
