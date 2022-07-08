import React from 'react'
import {
  Container,
  Typography,
  Grid,
  CssBaseline,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Box,
  Button
} from '@mui/material'
import { ProductHeader, Footer } from 'src/components/organisms'
import theme from 'src/theme'

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Album() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ProductHeader />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6)
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc. Make it short and
              sweet, but not too short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Box
              sx={{
                marginTop: theme.spacing(4)
              }}
            >
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Container
          sx={{
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8)
          }}
          maxWidth="md"
        >
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <CardMedia
                    sx={{
                      paddingTop: '56.25%' // 16:9
                    }}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>This is a media card. You can use this section to describe the content.</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  )
}
