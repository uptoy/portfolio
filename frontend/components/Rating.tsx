import React from "react"
import StarIcon from "@material-ui/icons/Star"
import StarBorderIcon from "@material-ui/icons/StarBorder" //empty
import StarHalfIcon from "@material-ui/icons/StarHalf"
import theme from "theme"
import { makeStyles } from "@material-ui/styles"
import { CircularProgress } from "@material-ui/core/"

interface IRating {
  value: number
  text?: string
}
const useStyles: any = makeStyles(() => ({
  icon: {
    fontSize: "2em",
    color: "#ffa000",
  },
}))

const Rating = ({ value, text }: IRating) => {
  const classes = useStyles()
  const iconStyle: React.CSSProperties = { padding: 10, fontSize: 50 }
  const loading = false

  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <StarIcon className={classes.icon} />
        ) : value >= 0.5 ? (
          <StarBorderIcon className={classes.icon} />
        ) : (
          <StarBorderIcon className={classes.icon} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <StarIcon className={classes.icon} />
        ) : value >= 1.5 ? (
          <StarBorderIcon className={classes.icon} />
        ) : (
          <StarBorderIcon className={classes.icon} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <StarIcon className={classes.icon} />
        ) : value >= 2.5 ? (
          <StarBorderIcon className={classes.icon} />
        ) : (
          <StarBorderIcon className={classes.icon} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <StarIcon className={classes.icon} />
        ) : value >= 3.5 ? (
          <StarBorderIcon className={classes.icon} />
        ) : (
          <StarBorderIcon className={classes.icon} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <StarIcon className={classes.icon} />
        ) : value >= 4.5 ? (
          <StarBorderIcon className={classes.icon} />
        ) : (
          <StarBorderIcon className={classes.icon} />
        )}
      </span>
      <span>{text && text}</span>
    </div>
  )
}

export default Rating
