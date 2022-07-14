import React from 'react'
import Typography from '@material-ui/core/Typography'

interface IProps {
  children: string
}

export default function Title(props: IProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  )
}
