import {makeStyles} from "@material-ui/styles"
import useSWR from "swr"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import {common} from "@material-ui/core/colors"
import {Product} from "@types"

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
  mySwiper: {
    "--swiper-navigation-color": common.black,
    "--swiper-pagination-color": common.black,
  },
}))

// interface Props {
//   title?: string
// }

const BaseURL = "http://localhost:8080/api"
// const Carousel = (props: Props) => {
//   const images = [
//     "https://swiperjs.com/demos/images/nature-1.jpg",
//     "https://swiperjs.com/demos/images/nature-2.jpg",
//     "https://swiperjs.com/demos/images/nature-3.jpg",
//     "https://swiperjs.com/demos/images/nature-4.jpg",
//     "https://swiperjs.com/demos/images/nature-5.jpg",
//     "https://swiperjs.com/demos/images/nature-6.jpg",
//     "https://swiperjs.com/demos/images/nature-7.jpg",
//     "https://swiperjs.com/demos/images/nature-8.jpg",
//     "https://swiperjs.com/demos/images/nature-9.jpg",
//     "https://swiperjs.com/demos/images/nature-10.jpg",
//   ]
//   const fetcher = (url: any) =>
//     fetch(url, {
//       method: "GET",
//       headers: {"Content-Type": "application/json"},
//       credentials: "include",
//     }).then((r) => r.json())
//   const {data, error} = useSWR(`${BaseURL}/products`, fetcher)
//   if (error) return <div>failed to load</div>
//   const products = data?.data
//   console.log("products", products)

//   const classes = useStyles()
//   return (
//     <>
//       <div className={classes.swiperBox}>
//         <p>{props.title}</p>
//         <Swiper
//           className={classes.Swiper}
//           slidesPerView={5}
//           spaceBetween={10}
//           slidesPerGroup={5}
//           loop={true}
//           loopFillGroupWithBlank={true}
//           navigation={true}
//           modules={[Navigation]}
//         >
//           {products !== undefined ? (
//             <div>
//               <ul>
//                 {products.map((product: any, index: any) => (
//                   <li>
//                     <SwiperSlide key={index}>
//                       {/* <img className={classes.img} src={image} /> */}
//                     </SwiperSlide>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <div></div>
//           )}
//         </Swiper>
//       </div>
//     </>
//   )
// }

// export default Carousel

import React, {useRef, useState} from "react"
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// import "./styles.css"

// import required modules
import {Pagination, Navigation} from "swiper"

export default function Carousel() {
  const fetcher = (url: any) =>
    fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    }).then((r) => r.json())
  const {data, error} = useSWR(`${BaseURL}/products`, fetcher)
  if (error) return <div>failed to load</div>
  const products = data?.data
  console.log("products", products)
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {products?.map((product: Product) => (
          <SwiperSlide key={product.id}>
            <img src={product.images[0].url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
