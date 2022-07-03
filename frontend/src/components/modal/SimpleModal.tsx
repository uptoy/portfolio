import theme from 'src/theme'
import React from 'react'
import { Box, Button, Modal } from '@mui/material'

// const useStyles: any = makeStyles(() => ({
//   // modal: {
//   //   display: "flex",
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   // },
//   paper: {
//     position: 'absolute',
//     width: 450,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)'
//   }
// }))

interface IProps {
  open: boolean
  handleClose(): void
  children: React.ReactNode
}

export default function SimpleModal(props: IProps) {
  // const classes = useStyles()
  // const [open, setOpen] = React.useState(false)

  // const handleOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  return (
    <Box component="div">
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
      >
        <Box component="div"
          sx={{
            position: 'absolute',
            width: 450,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* <h2>Simple React Modal</h2>
          <Typography variant="inherit">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim, non
            pharetra est ultrices et.
          </Typography> */}
          {props.children}
        </Box>
      </Modal>
    </Box>
  )
}
