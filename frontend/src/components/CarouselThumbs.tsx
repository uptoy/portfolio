import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Image } from 'src/@types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Typography, Card, CardContent, Box } from '@mui/material'

const theme = createTheme()

// const useStyles: any = makeStyles(() => ({
//   swiperBox: {
//     height: '30em',
//     width: '100%',
//     margin: 'auto'
//   },
//   mySwiper: {
//     height: '6em'
//   },
//   mySwiper2: {
//     height: '20em'
//   },
//   img: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover'
//   }
// }))

interface IProps {
  images: Image[]
}

const CarouselThumbs: React.FC<IProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>('')
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '30em',
          width: '100%',
          margin: 'auto'
        }}
      >
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`mySwiper2`}
          style={{ height: '20em' }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                src={image.url}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`mySwiper`}
          style={{ height: '6em' }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={image.url} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </ThemeProvider>
  )
}

export default CarouselThumbs
