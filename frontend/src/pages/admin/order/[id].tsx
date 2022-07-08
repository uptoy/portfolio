import React from 'react'
import { AdminLayout } from 'src/components/dashboard'
import theme from 'src/theme'
import { Button, TextField, Grid } from '@mui/material'


export default function AdminOrderDetail() {
  return (
    <AdminLayout>
      <Grid container spacing={4}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              autoFocus
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} sx={{ textAlign: 'end', paddingTop: 0 }}>
            <Button
              variant="contained"
              sx={{
                margin: theme.spacing(3, 1, 2),
                padding: theme.spacing(1, 5)
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{
                margin: theme.spacing(3, 1, 2),
                padding: theme.spacing(1, 5)
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}
