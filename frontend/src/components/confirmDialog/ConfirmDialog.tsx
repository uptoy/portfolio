import { Button, Typography, Box } from '@mui/material'
import { Circular } from 'src/components/common/Circular'

import { Modal } from 'src/components/modal'

interface Props {
  title: string
  message: string
  isVisible: boolean
  onClose(): void
  onConfirm(): void
  isConfirming: boolean
}

// const useStyles: any = makeStyles({
//   buttonsContainer: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     marginTop: 10
//   },
//   message: {
//     marginTop: 20
//   }
// })

const ConfirmDialog: React.FC<Props> = ({ title, message, isVisible, onClose, onConfirm, isConfirming }) => {
  // const classes = useStyles()

  return (
    <Modal title={title} isVisible={isVisible} onClose={onClose} withClose={false}>
      <Typography
        variant="body1"
        sx={{
          marginTop: 20
        }}
      >
        {message}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 10
        }}
      >
        <Button color="secondary" sx={{ marginRight: 10 }} onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={onConfirm} disableElevation disabled={isConfirming}>
          {isConfirming ? <Circular /> : 'Okay'}
        </Button>
      </Box>
    </Modal>
  )
}

export default ConfirmDialog
