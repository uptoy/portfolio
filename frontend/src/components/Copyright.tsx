import React from 'react'
import { Typography } from '@mui/material'

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
    </Typography>
  )
}

export default Copyright
