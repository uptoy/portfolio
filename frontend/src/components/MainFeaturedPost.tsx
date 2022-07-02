import * as React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const mainFeaturedPost = {
  title: 'Welcome to my Portfolio',
  description: "This is DEMO site. So. You can't buy product. This site's technology stack Next.js & Golang",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description'
}

export default function MainFeaturedPost() {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${mainFeaturedPost.image})`
      }}
    >
      {<img style={{ display: 'none' }} src={mainFeaturedPost.image} alt={mainFeaturedPost.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)'
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 }
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {mainFeaturedPost.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {mainFeaturedPost.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
