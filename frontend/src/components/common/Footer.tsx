import { Box } from '@mui/material'
import React from 'react'

const Footer = () => (
  <footer>
    <Box component="div" className="container">
      <a href="/" className="logo-font">
        conduit
      </a>
      <span className="attribution">
        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed
        under MIT.
      </span>
    </Box>
  </footer>
)

export default Footer
