import React, { useState } from 'react'
import { Box, Typography, Container } from '@material-ui/core'
import { Link, Copyright, Carousel } from 'src/components'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/styles'
import theme from 'src/theme'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles(() => ({
  favorite: {
    minWidth: 30,
    color: red[500],
    marginRight: theme.spacing(1),
    fontSize: '2.5em'
  }
}))

export default function About() {
  const text = 'Ralated'
  return (
    <Container maxWidth="lg">
      {/* <Carousel title="Ralated Product" />
      <Carousel title="Popular products" /> */}
      <PlayGround />
    </Container>
  )
}

const PlayGround = () => {
  const [state, setState] = useState(false)
  const classes = useStyles()
  const handleClick = () => {
    setState(!state)
  }
  return (
    <>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js with TypeScript example
        </Typography>
        <Link href="/">Go to the main page</Link>
        <Copyright />
        <div onClick={handleClick}>
          {state ? <FavoriteIcon className={classes.favorite} /> : <FavoriteBorderIcon className={classes.favorite} />}
        </div>
      </Box>
    </>
  )
}
