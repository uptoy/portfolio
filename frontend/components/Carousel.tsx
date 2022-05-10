import {makeStyles} from "@material-ui/styles"
import useSWR from "swr"
import {common} from "@material-ui/core/colors"
import {Product} from "@types"
import theme from "theme"
import {Typography, Card, CardContent} from "@material-ui/core"
import Link from "next/link"
import React from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation} from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

const BaseURL = "http://localhost:8080/api"
const useStyles: any = makeStyles(() => ({
  cardGrid: {
    padding: theme.spacing(4, 0),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "80%",
  },
  cardContent: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0.25),
  },
  cardActions: {
    justifyContent: "space-between",
  },
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
  imageContainer: {
    height: "14vh",
  },
}))

interface IProps {
  title: string
}

export default function Carousel(props: IProps) {
  // const {prosucts,}
  const classes = useStyles()
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
    <div className={classes.swiperBox}>
      <p>{props.title}</p>
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
            {/* <img src={product.images[0].url} /> */}
            <Link href={`/products/${String(product.id)}`}>
              <Card className={classes.card}>
                <div className={classes.imageContainer}>
                  <img className={classes.img} src={product.images[0].url} />
                </div>
                <CardContent className={classes.cardContent}>
                  <Typography>{product.product_name}</Typography>
                  <Typography>
                    {"$ "}
                    {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

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
