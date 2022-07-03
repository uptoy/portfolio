import React from 'react'
import Paper from '@mui/material/Paper'
import { common, grey } from '@mui/material/colors'
import { Box } from '@mui/material'

const white = common.white
const grey800 = grey['800']

interface InfoBoxProps {
  Icon?: any // eslint-disable-line
  spanBgColor: string
  title: string
  value: string
}

const InfoBox = (props: InfoBoxProps) => {
  const { spanBgColor, title, value, Icon } = props

  const styles = {
    content: {
      padding: '5px 10px',
      marginLeft: 90,
      height: 80
    },
    number: {
      display: 'block',
      fontWeight: 500,
      fontSize: 18,
      color: grey800
    },
    text: {
      fontSize: 20,
      fontWeight: 500,
      color: grey800
    },
    icon: {
      height: 48,
      width: 48,
      marginTop: 20,
      maxWidth: '100%',
      color: white
    }
  }

  return (
    <Paper>
      <Box
        component="div"
        sx={{
          float: 'left',
          height: 80,
          width: 90,
          textAlign: 'center',
          backgroundColor: spanBgColor
        }}
      >
        <Icon style={styles.icon} />
      </Box>

      <Box
        component="div"
        sx={{
          padding: '5px 10px',
          marginLeft: 90,
          height: 80
        }}
      >
        <span style={styles.text}>{title}</span>
        <span style={styles.number}>{value}</span>
      </Box>
    </Paper>
  )
  // }
}

export default InfoBox
