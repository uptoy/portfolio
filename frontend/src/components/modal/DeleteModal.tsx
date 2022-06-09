import CircularProgress from '@material-ui/core/CircularProgress'
import SimpleModal from 'src/components/modal/SimpleModal'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import React from 'react'
import theme from 'src/theme'

interface IProps {
  open: boolean
  handleClose(): void
  handleDelete(): void
  isSubmitting: boolean
}

const useStyles: any = makeStyles(() =>
  createStyles({
    submit_container: {
      marginLeft: 'auto',
      marginTop: '1em',
      width: '10.5em',
      display: 'flex'
    },
    formControl: {
      margin: theme.spacing(1, 0)
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
)

// create
// edit
const DeleteModal = (props: IProps) => {
  const { handleClose, handleDelete, isSubmitting } = props
  const classes = useStyles()
  return (
    <>
      <SimpleModal open={props.open} handleClose={handleClose}>
        <p>Don't you delete ?</p>
        <div className={classes.submit_container}>
          <Button variant="contained" style={{ marginRight: '1em' }} onClick={handleClose}>
            Back
          </Button>
          <Button variant="contained" disabled={isSubmitting} onClick={handleDelete}>
            {isSubmitting ? <CircularProgress size={25} /> : 'Submit'}
          </Button>
        </div>
      </SimpleModal>
    </>
  )
}

export default DeleteModal
