import React from 'react'
import { CircularProgress, Box } from '@mui/material'

export const Circular = () => {
  return (
    <Box
      sx={{
        height: '10em',
        position: 'relative'
      }}
    >
      <CircularProgress
        color="secondary"
        sx={{
          margin: 0,
          position: 'absolute',
          top: '100%',
          left: '50%',
          marginRight: '-50%'
        }}
      />
    </Box>
  )
}
