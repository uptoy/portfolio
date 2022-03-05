import React from 'react'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://v4.mui.com/getting-started/installation/">
        Material UI 4
      </MuiLink>{' '}
      <MuiLink
        color="inherit"
        href="https://github.com/mui/material-ui/tree/v4.x/docs/src/pages/getting-started/templates"
      >
        templates
      </MuiLink>{' '}
      <MuiLink
        color="inherit"
        href="https://github.com/mui/material-ui/tree/v4.x/examples/nextjs-with-typescript"
      >
        nextjs-with-typescript
      </MuiLink>{' '}
      <MuiLink
        color="inherit"
        href="/"
      >
        TOP
      </MuiLink>{' '}
      <MuiLink
        color="inherit"
        href="/auth/signin"
      >
        signin
      </MuiLink>{' '}
      <MuiLink
        color="inherit"
        href="/auth/signup"
      >
        signup
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
