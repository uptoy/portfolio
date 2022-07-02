import { Box } from '@mui/material'

export const AspectRatioBox = ({ children, ratio = 1 }: any) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          '& > *': { height: '100%', width: '100%' }
        }}
      >
        {children}
      </Box>
      <div style={{ paddingBottom: (1 / ratio) * 100 + '%' }} />
    </Box>
  )
}
