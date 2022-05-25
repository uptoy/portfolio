import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Image } from 'src/@types'

const useStyles: any = makeStyles(() => ({
  swiperBox: {
    height: '30em',
    width: '100%',
    margin: 'auto'
  },
  mySwiper: {
    height: '6em'
  },
  mySwiper2: {
    height: '20em'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}))

interface IProps {
  images: Image[]
}

const CarouselThumbs: React.FC<IProps> = ({ images }) => {
  const classes = useStyles()
  const [thumbsSwiper, setThumbsSwiper] = useState<any>('')
  return (
    <>
      <div className={classes.swiperBox}>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`mySwiper2 ${classes.mySwiper2}`}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className={classes.swiperSlide}>
              <img className={classes.img} src={image.url} />
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
          className={`mySwiper ${classes.mySwiper}`}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className={classes.swiperSlide}>
              <img className={classes.img} src={image.url} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default CarouselThumbs
