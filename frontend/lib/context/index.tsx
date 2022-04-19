import PageContext from './PageContext'
import PageCountContext from './PageCountContext'

const ContextProvider = ({ children }: any) => (
  <PageContext>
    <PageCountContext>{children}</PageCountContext>
  </PageContext>
)

export default ContextProvider
