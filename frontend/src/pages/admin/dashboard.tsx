import React from 'react'
import clsx from 'clsx'
import { Box, Grid, Paper } from '@mui/material'
import { Chart, Deposits, Orders, AdminLayout } from 'src/components/dashboard'
import { Copyright } from 'src/components'
import theme from 'src/theme'


export default function Dashboard() {
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const fixedHeightPaper = clsx(
    {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column'
    },
    {
      height: 240
    }
  )

  return (
    <AdminLayout open={open} onClick={handleDrawerOpen}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: theme.spacing(2),
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Orders />
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </AdminLayout>
  )
}
