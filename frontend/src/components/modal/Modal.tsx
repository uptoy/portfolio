import { Fade, Backdrop, Box, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MaterialModal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import ReactDOM from 'react-dom'
import theme from 'src/theme'

// const useStyles: any = makeStyles(() => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   modalHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     borderRadius: 6,
//     width: '90%',
//     [theme.breakpoints.up('md')]: {
//       width: 600
//     }
//   },
//   closeContainer: {
//     display: 'flex',
//     justifyContent: 'flex-end'
//   }
// }))

interface Props {
  isVisible: boolean
  onClose(): void
  title: string
  withClose?: boolean
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ title, isVisible, onClose, children, withClose = true }) => {
  return (
    <>
      {isVisible &&
        ReactDOM.createPortal(
          <>
            <MaterialModal
              open={isVisible}
              onClose={onClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Fade in={isVisible}>
                <Box
                  component="div"
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[5],
                    padding: theme.spacing(2, 4, 3),
                    borderRadius: 6,
                    width: '90%',
                    [theme.breakpoints.up('md')]: {
                      width: 600
                    }
                  }}
                >
                  <Box
                    component="div"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10
                    }}
                  >
                    <Typography variant="h6">{title}</Typography>
                    {withClose && (
                      <Box
                        component="div"
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <IconButton aria-label="close" onClick={onClose}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                  {children}
                </Box>
              </Fade>
            </MaterialModal>
          </>,
          document.body
        )}
    </>
  )
}

export default Modal
