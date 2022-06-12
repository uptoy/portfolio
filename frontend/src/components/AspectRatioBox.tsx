import makeStyles from "@material-ui/styles/makeStyles"

const useStyles: any = makeStyles(() => ({
  root: {position: "relative"},
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    "& > *": {height: "100%", width: "100%"},
  },
}))

export const AspectRatioBox = ({children, ratio = 1}: any) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>{children}</div>
      <div style={{paddingBottom: (1 / ratio) * 100 + "%"}} />
    </div>
  )
}
