import React from "react"
import {makeStyles} from "@material-ui/styles"
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation} from "swiper"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import {Product} from "@types"
import {common} from "@material-ui/core/colors"
import {Card} from "@material-ui/core"
import Link from "next/link"

const useStyles: any = makeStyles(() => ({
  swiperBox: {
    padding: 20,
    height: "20em",
    margin: "auto",
  },
  swiper: {
    "--swiper-navigation-color": common.black,
    "--swiper-pagination-color": common.black,
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imageContainer: {
    height: "13vh",
  },
}))

interface Props {
  title?: string
  products: Product[]
}

const Carousel = (props: Props) => {
  const {title, products} = props
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
        <p>{title}</p>

        <Swiper
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Navigation]}
          className={`mySwiper ${classes.mySwiper}`}
        >
          {products !== undefined ? (
            <div>
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <Card className={classes.card}>
                    <Link href={`/products/${String(product.id)}`}>
                      <div className={classes.imageContainer}>
                        <img className={classes.img} src={product.images[0].url} />
                      </div>
                    </Link>

                    <p>{product.product_name}</p>
                  </Card>
                </SwiperSlide>
              ))}
            </div>
          ) : (
            <div>Failed</div>
          )}
        </Swiper>
      </div>
    </>
  )
}

export default Carousel

// {images.map((image, index) => (
//   <SwiperSlide key={index} className={classes.swiperSlide}>
//     {/* <img className={classes.img} src={image.url} /> */}
//     <p>aaaa</p>
//   </SwiperSlide>
// ))}

// {/* <Swiper
// className={classes.swiper}
// slidesPerView={5}
// spaceBetween={10}
// slidesPerGroup={5}
// loop={true}
// loopFillGroupWithBlank={true}
// navigation={true}
// modules={[Navigation]}
// >
// {products !== undefined ? (
//   <div>
//     {products.map((product, index) => (
//       <div key={product.id}>
//         {/* <SwiperSlide key={`${product.id}-${index}`}>
//           <img className={classes.img} src={product.images[0].url} />
//         </SwiperSlide> */}
//         {index}
//       </div>
//     ))}
//   </div>
// ) : (
//   <div>Failed</div>
// )}
// </Swiper> */}

// {products !== undefined ? (
//   <div>
//     {products.map((product, index) => (
//       <div key={product.id}>
//         {/* <SwiperSlide key={`${product.id}-${index}`}>
//           <img className={classes.img} src={product.images[0].url} />
//         </SwiperSlide> */}
//         {index}
//       </div>
//     ))}
//   </div>
// ) : (
//   <div>Failed</div>
// )}
