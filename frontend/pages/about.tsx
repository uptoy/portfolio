import React, { useState } from "react"
import { Box, Typography, Container } from "@material-ui/core"
import { Link, Copyright, Carousel } from "components"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import { makeStyles } from "@material-ui/styles"
import theme from "theme"
import { red } from "@material-ui/core/colors"

const useStyles: any = makeStyles(() => ({
  favorite: {
    minWidth: 30,
    color: red[500],
    marginRight: theme.spacing(1),
    fontSize: "2.5em",
  },
}))

export default function About() {
  return (
    <Container maxWidth="sm">
      <Carousel />
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
          {state ? (
            <FavoriteIcon className={classes.favorite} />
          ) : (
            <FavoriteBorderIcon className={classes.favorite} />
          )}
        </div>
      </Box>
    </>
  )
}
