import * as React from 'react'
import {
  Typography,
  Container,
  Box,
} from '@material-ui/core'
import Copyright from 'components/Copyright'

interface FooterProps {
  description: string
  title: string
}

export default function Footer(props: FooterProps) {
  const { description, title } = props

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  )
}
