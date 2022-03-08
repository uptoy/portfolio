import React from "react"
import Paper from "@material-ui/core/Paper"
import { common, grey } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/styles"
import { createStyles } from "@material-ui/core/styles"

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

  const useStyles: any = makeStyles(() =>
    createStyles({
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
      iconSpan: {
        float: "left" as any,
        height: 80,
        width: 90,
        textAlign: "center" as any,
        backgroundColor: spanBgColor as any,
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: "100%",
        color: white,
      },
    })
  )
  const classes = useStyles()

  return (
    <Paper>
      <span className={classes.iconSpan}>
        <Icon className={classes.icon} />
      </span>

      <div className={classes.content}>
        <span className={classes.text}>{title}</span>
        <span className={classes.number}>{value}</span>
      </div>
    </Paper>
  )
  // }
}

export default InfoBox
