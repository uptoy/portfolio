import * as React from 'react'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import Link from './Link'

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}
