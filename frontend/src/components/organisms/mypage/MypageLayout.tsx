import React, { ReactNode } from 'react'
import { Container, Grid, ThemeProvider } from '@mui/material'
import { CommonHeader } from 'src/components/organisms'
import { MypageSidebar } from 'src/components/organisms/mypage'
import MypageFooter from './MypageFooter'
import theme from 'src/theme'


interface IProps {
  children: ReactNode
}

const DashboardLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <CommonHeader />
      <Container maxWidth="lg">
        <main>
          <Grid
            container
            spacing={3}
            sx={{
              marginTop: theme.spacing(2)
            }}
          >
            <Grid item md={3} xs={12}>
              <MypageSidebar />
            </Grid>
            <Grid item md={9} xs={12}>
              {children}
            </Grid>
          </Grid>
        </main>
      </Container>
      <MypageFooter />
    </>
  )
}

export default DashboardLayout
