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
  },
  cardContent: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0.25),
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
  products: Product[]
}

export default function Carousel(props: IProps) {
  const {title, products} = props
  const classes = useStyles()

  return (
    <div className={classes.swiperBox}>
      <p>{title}</p>
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
