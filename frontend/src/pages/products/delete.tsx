import React from 'react'
import { CssBaseline, Button, Container, Box, Typography } from '@mui/material'
import theme from 'src/theme'

export default function ProductDelete() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        component="div"
        sx={{ marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography component="h1" variant="h5">
          Product Delete
        </Typography>
        <Typography component="h5" variant="h5">
          Do you Delete This Product ?
        </Typography>
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ margin: theme.spacing(3, 0, 2) }}>
          Delete
        </Button>
      </Box>
    </Container>
  )
}
