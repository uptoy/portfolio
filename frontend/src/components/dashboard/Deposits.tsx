import * as React from 'react'
import { Typography, Link, Box } from '@mui/material'
import Title from './Title'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <Box component="div">
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </Box>
    </React.Fragment>
  )
}
