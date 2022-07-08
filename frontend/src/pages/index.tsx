import { Game } from '../components/Game'
import type { NextPage } from 'next'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { Rating, CarouselContainer } from 'src/components'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'
import { Typography, Grid, Container, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material'
import { Layout } from 'src/components/organisms'
import { mainFeaturedPost } from 'src/utils/seed'
import { red, common } from '@mui/material/colors'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import theme from '@/theme'
import { IProduct, IReview } from 'src/@types'
import { useAuth } from 'src/context/AuthContext'
import { Average } from 'src/utils/average'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { BaseURL } from '@/common'
import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MainFeaturedPost from '../components/MainFeaturedPost'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Index() {
  return (
    <Layout>
      <MainFeaturedPost />
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image="https://source.unsplash.com/random"
                alt="random"
                sx={{
                  maxHeight: '50rem'
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Heading
                </Typography>
                <Typography>This is a media card. You can use this section to describe the content.</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CarouselContainer />
    </Layout>
  )
}
