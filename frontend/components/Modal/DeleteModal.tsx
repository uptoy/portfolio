import SimpleModal from "components/Modal/SimpleModal"
import {Button} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {createStyles} from "@material-ui/core/styles"
import React from "react"
import theme from "theme"

interface IProps {
  open: boolean
  handleClose(): void
  handleDelete(): void
}

const useStyles: any = makeStyles(() =>
  createStyles({
    submit_container: {
      marginLeft: "auto",
      marginTop: "1em",
      width: "10.5em",
    },
    formControl: {
      margin: theme.spacing(1, 0),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

// create
// edit
const DeleteModal = (props: IProps) => {
  const classes = useStyles()
  return (
    <>
      <SimpleModal open={props.open} handleClose={props.handleClose}>
        <p>Don't you delete ?</p>
        <div className={classes.submit_container}>
          <Button variant="contained" style={{marginRight: "1em"}} onClick={props.handleClose}>
            Back
          </Button>
          {/* <Button variant="contained" onClick={props.handleDelete}> */}
          <Button variant="contained">Delete</Button>
        </div>
      </SimpleModal>
    </>
  )
}

export default DeleteModal
