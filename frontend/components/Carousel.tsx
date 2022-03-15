import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

const useStyles: any = makeStyles(() => ({
  swiperBox: {
    padding: 20,
    height: "20em",
    margin: "auto",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}))

interface Props {
  title?: string
}

const Carousel = (props: Props) => {
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
  return (
    <>
      <div className={classes.swiperBox}>
        <p>{props.title}</p>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          slidesPerView={5}
          spaceBetween={10}
          slidesPerGroup={5}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          modules={[Navigation]}
        >
          {images.map((image) => (
            <SwiperSlide>
              <img className={classes.img} src={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default Carousel
