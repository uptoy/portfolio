import {makeStyles} from "@material-ui/styles"
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
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      opacity: 0.5,
    },
    "&:active": {
      opacity: 1,
    },
  },
  cardContent: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0.25),
  },
  swiperBox: {
    height: "26em",
    margin: "auto",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imageContainer: {
    height: "17em",
  },
}))

interface IProps {
  title: string
  products: Product[]
}

export default function Carousel(props: IProps) {
  const {title, products} = props
  const classes = useStyles()

  return (
    <div className={classes.swiperBox}>
      <p>{title}</p>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          460: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
        }}
      >
        {products?.map((product: Product) => (
          <SwiperSlide key={product.id}>
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
