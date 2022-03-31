import {AppProps} from "next/app"
import {Provider} from "react-redux"
import {wrapper} from "app/store"
import store from "app/store"

const MyApp = ({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(MyApp)
