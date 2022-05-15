import React from "react"
import Head from "next/head"
import {AppProps} from "next/app"
import {ThemeProvider} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "theme"
import "styles/globals.css"
import ContextProvider from "context"
import {Provider} from "react-redux"
import {wrapper} from "app/store"
import {Toaster} from "react-hot-toast"
import makeStyles from "@material-ui/styles/makeStyles"
import store from "app/store"
import {createTheme} from "@material-ui/core/styles"

function MyApp(props: any) {
  const {Component, pageProps} = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  const useGlobalStyles = makeStyles({
    "@global": {
      body: {
        backgroundColor: "#f5f6f6",
      },
    },
  })
  function MyThemeProvider({children}: any) {
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
      <Provider store={store}>
        <MyThemeProvider theme={theme}>
          <ContextProvider>
            <Component {...pageProps} />
          </ContextProvider>
        </MyThemeProvider>
      </Provider>
    </React.Fragment>
  )
}

export default wrapper.withRedux(MyApp)
