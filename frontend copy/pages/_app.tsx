import React from "react"
import Head from "next/head"
import {AppProps} from "next/app"
import {ThemeProvider} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "theme"
import "styles/globals.css"
// import Layout from "components/common/Layout";
import ContextProvider from "lib/context"

export default function MyApp(props: AppProps) {
  const {Component, pageProps} = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ContextProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ContextProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}
