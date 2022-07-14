import { makeStyles } from '@material-ui/styles'
import theme from 'src/theme'
import React, { ReactChild } from 'react'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles(() => ({
  // modal: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  paper: {
    position: 'absolute',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

interface IProps {
  open: boolean
  handleClose(): void
  children: ReactChild
}

export default function SimpleModal(props: IProps) {
  const classes = useStyles()
  // const [open, setOpen] = React.useState(false)

  // const handleOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
      >
        <div className={classes.paper}>
          {/* <h2>Simple React Modal</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim, non
            pharetra est ultrices et.
          </p> */}
          {props.children}
        </div>
      </Modal>
    </div>
  )
}
