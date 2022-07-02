import React from 'react'
import { Container } from '@mui/material'
import ProductHeader from './ProductHeader'
import Footer from './Footer'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

interface IProps {
  children: React.ReactNode
}

const Layout: React.FC<IProps> = ({ children }) => {
  const theme = createTheme()
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProductHeader />
        <Container maxWidth="lg" style={{ padding: 10 }}>
          <main>{children}</main>
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default Layout
