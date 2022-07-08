import { IProduct, IReview } from 'src/@types'
import { Typography, Card, CardContent, Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { Rating } from 'src/components'
import { Average } from 'src/utils/average'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const theme = createTheme()

interface IProps {
  title: string
  products: IProduct[]
}

export default function Carousel(props: IProps) {
  const { title, products } = props
  const imageTopUrl = products && products[0] ? products[0].images && products[0].images[0].url : ''
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '26em', margin: 'auto' }}>
        <Typography variant="inherit">{title}</Typography>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            460: {
              slidesPerView: 2
            },
            640: {
              slidesPerView: 3
            },
            768: {
              slidesPerView: 4
            }
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <Link href={`/products/${String(product.id)}`}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      opacity: 0.5
                    },
                    '&:active': {
                      opacity: 1
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: '17em'
                    }}
                  >
                    <img src={`${imageTopUrl}?w=164&h=164&fit=crop&auto=format`} loading="lazy" alt={imageTopUrl} />
                  </Box>
                  <CardContent>
                    <Typography>{product.product_name}</Typography>
                    <Rating
                      value={Average(
                        product.reviews && product.reviews[0] ? product.reviews.map((review) => review.rating) : []
                      )}
                    />
                    <Typography>
                      {'$ '}
                      {product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </ThemeProvider>
  )
}
