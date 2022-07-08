import { Box } from '@mui/material'

type Props = {
  children: any
  ratio: number
}

export const AspectRatioBox = ({ children, ratio = 1 }: Props) => {
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
      <Box component="div" sx={{ paddingBottom: (1 / ratio) * 100 + '%' }} />
    </Box>
  )
}
