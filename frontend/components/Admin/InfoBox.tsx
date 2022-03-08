import React from "react"
import Paper from "@material-ui/core/Paper"
import { common, grey } from "@material-ui/core/colors"

const white = common.white
const grey800 = grey["800"]

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
      padding: "5px 10px",
      marginLeft: 90,
      height: 80,
    },
    number: {
      display: "block",
      fontWeight: 500,
      fontSize: 18,
      color: grey800,
    },
    text: {
      fontSize: 20,
      fontWeight: 500,
      color: grey800,
    },
    icon: {
      height: 48,
      width: 48,
      marginTop: 20,
      maxWidth: "100%",
      color: white,
    },
  }

  return (
    <Paper>
      <div
        style={{
          float: "left",
          height: 80,
          width: 90,
          textAlign: "center",
          backgroundColor: spanBgColor,
        }}
      >
        <Icon style={styles.icon} />
      </div>

      <div style={styles.content}>
        <span style={styles.text}>{title}</span>
        <span style={styles.number}>{value}</span>
      </div>
    </Paper>
  )
  // }
}

export default InfoBox
