import * as React from 'react'
import { Box } from '@mui/material'

const AdminAbout = () => {
  return (
    <>
      <Box
        sx={{
          paddingTop: '3em',
          display: 'grid',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            paddingTop: '50px',
            paddingBottom: '30px',
            textAlign: 'center',
            fontSize: '36px'
          }}
        >
          <b>About</b>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '24px',
            color: 'darkcyan'
          }}
        >
          Admin
        </Box>
        <Box
          sx={{
            padding: '0px 50px',
            fontSize: '20px'
          }}
        >
          <p>admin</p>
        </Box>
      </Box>
    </>
  )
}

export default AdminAbout
