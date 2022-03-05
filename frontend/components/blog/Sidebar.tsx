import * as React from 'react'
import Link from 'components/Link'
import Stack from '@material-ui/core/Stack';
import {
  Grid,
  Typography,
  Paper,
} from '@material-ui/core'

interface SidebarProps {
  archives: ReadonlyArray<{
    url: string
    title: string
  }>
  description: string
  social: ReadonlyArray<{
    icon: React.ElementType
    name: string
  }>
  title: string
}

export default function Sidebar(props: SidebarProps) {
  const { archives, description, social, title } = props

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6">Archives</Typography>
      {archives.map((archive) => (
        <Link display="block" variant="body1" href={archive.url} key={archive.title}>
          {archive.title}
        </Link>
      ))}
      <Typography variant="h6">Social</Typography>
      {social.map((network) => (
        <Link display="block" variant="body1" href="#" key={network.name} >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  )
}
