import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder' //empty
import StarHalfIcon from '@mui/icons-material/StarHalf'
import { Box } from '@mui/material'

interface IRating {
  value: number
  text?: string
}

const Rating = ({ value, text }: IRating) => {
  return (
    <Box component="div" className="rating">
      <span>
        {value >= 1 ? (
          <StarIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        ) : value >= 0.5 ? (
          <StarHalfIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        ) : (
          <StarBorderIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <StarIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        ) : value >= 1.5 ? (
          <StarHalfIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        ) : (
          <StarBorderIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <StarIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        ) : value >= 2.5 ? (
          <StarHalfIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        ) : (
          <StarBorderIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <StarIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        ) : value >= 3.5 ? (
          <StarHalfIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        ) : (
          <StarBorderIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <StarIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        ) : value >= 4.5 ? (
          <StarHalfIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        ) : (
          <StarBorderIcon
            sx={{
              fontSize: '2em',
              color: '#ffa000'
            }}
          />
        )}
      </span>
      <span>{text && text}</span>
    </Box>
  )
}

export default Rating
