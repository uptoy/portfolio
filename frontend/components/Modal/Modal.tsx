import {Typography} from "@material-ui/core"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import IconButton from "@material-ui/core/IconButton"
import MaterialModal from "@material-ui/core/Modal"
import {makeStyles} from "@material-ui/styles"
import CloseIcon from "@material-ui/icons/Close"
import React from "react"
import ReactDOM from "react-dom"
import {Theme} from "@material-ui/core/styles"

const useStyles: any = makeStyles((theme: Theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: "white",
    padding: "2em",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  closeContainer: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    top: "3%",
    left: "90%",
  },
}))

interface Props {
  isVisible: boolean
  onClose(): void
  name: string
  withClose?: boolean
}

const Modal: React.FC<Props> = ({name, isVisible, onClose, children, withClose = true}) => {
  const classes = useStyles()

  return (
    <>
      {isVisible &&
        ReactDOM.createPortal(
          <>
            <MaterialModal
              open={isVisible}
              onClose={onClose}
              className={classes.modal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={isVisible}>
                <div className={classes.paper}>
                  <div className={classes.modalHeader}>
                    <Typography variant="h6">{name}</Typography>
                    {withClose && (
                      <div className={classes.closeContainer}>
                        <IconButton aria-label="close" onClick={onClose}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>
                  {children}
                </div>
              </Fade>
            </MaterialModal>
          </>,
          document.body
        )}
    </>
  )
}

export default Modal
