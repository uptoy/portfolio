import React, { useRef, useState } from "react"
import { makeStyles } from "@material-ui/styles"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation, Thumbs } from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

const useStyles: any = makeStyles(() => ({
  swiperBox: {
    height: "30em",
    width: "25em",
    margin: "auto",
  },
  mySwiper: {
    height: "6em",
  },
  mySwiper2: {
    height: "20em",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  swiperSlide: {
    opacity: 0.4,
  },
}))

const Carousel = () => {
  const images = [
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-2.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-4.jpg",
    "https://swiperjs.com/demos/images/nature-5.jpg",
    "https://swiperjs.com/demos/images/nature-6.jpg",
    "https://swiperjs.com/demos/images/nature-7.jpg",
    "https://swiperjs.com/demos/images/nature-8.jpg",
    "https://swiperjs.com/demos/images/nature-9.jpg",
    "https://swiperjs.com/demos/images/nature-10.jpg",
  ]
  const classes = useStyles()
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  return (
    <>
      <div className={classes.swiperBox}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`mySwiper2 ${classes.mySwiper2}`}
        >
          {images.map((image) => (
            <SwiperSlide className={classes.swiperSlide}>
              <img className={classes.img} src={image} />
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
          {images.map((image) => (
            <SwiperSlide className={classes.swiperSlide}>
              <img className={classes.img} src={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default Carousel
