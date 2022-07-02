import { CircularProgress, Box } from '@mui/material'
const PageLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        right: 0,
        top: 0
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column'
        }}
      >
        <img
          src="http://placehold.jp/150x150.png"
          alt="Budgetpal logo"
          style={{ width: 80, height: 80, marginBottom: 20 }}
        />
        <CircularProgress />
      </Box>
    </Box>
  )
}

export default PageLoader
