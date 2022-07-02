import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'


interface Props {
  message?: string
  title?: string
}

const PageError: React.FC<Props> = ({ message = 'Something went wrong.', title = "This page is'nt available" }) => {
  const router = useRouter()
  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 10
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: 20
        }}
      >
        {message}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBackToHome}>
        Back to home
      </Button>
    </Box>
  )
}

export default PageError
