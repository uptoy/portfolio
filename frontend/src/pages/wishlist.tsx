import Image from 'next/image'
import React from 'react'
import theme from 'src/theme'
import { CarouselContainer } from 'src/components'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'
import { Box, Paper, Grid, Typography } from '@mui/material'
import { Layout } from 'src/components/organisms'
import { IProduct, IWishlist } from 'src/@types'
import { Link } from 'src/components'
import CancelIcon from '@mui/icons-material/Cancel'
import { Circular } from 'src/components/Circular'
import { useDeleteWishlist, useGetWishlist, useGetWishlistServer } from '@/hooks/fetcher'

type IProps = {
  data?: IWishlist
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { req } = ctx
  if (req.headers.cookie === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signup'
      }
    }
  }
  const wishlist = await useGetWishlistServer()
  return { props: { wishlist } }
}
const Wishlist = (props: IProps) => {
  const { data: fetchWishlist, error, mutate } = useGetWishlist(props)
  if (error) {
    return <div>error</div>
  }
  if (!fetchWishlist) {
    return <Circular />
  }
  const handleDelete = async (product: IProduct) => {
    await useDeleteWishlist(product)
    await mutate({ ...fetchWishlist, product })
  }
  return (
    <Layout>
      <Box component="div" sx={{ marginTop: '2em', marginBottom: '2em' }}>
        {fetchWishlist.products.length === 0 ? (
          <Paper
            sx={{
              padding: theme.spacing(5),
              color: theme.palette.text.secondary
            }}
          >
            <Typography variant="inherit">Wishlist is empty.</Typography>
            <Link href="/">Go shopping</Link>
          </Paper>
        ) : (
          <Box>
            <Typography variant="inherit">Wishlist</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                {fetchWishlist.products?.map((item, index: number) => (
                  <Paper
                    sx={{
                      marginBottom: '1em',
                      position: 'relative'
                    }}
                    key={index}
                  >
                    <Grid container xs={12} sm={12}>
                      <Grid item xs={5} style={{ minWidth: '7em', maxWidth: '13em' }}>
                        <Box
                          component="div"
                          sx={{
                            width: '30vw',
                            height: '100%',
                            minHeight: '8em',
                            minWidth: '8em',
                            maxHeight: '13em',
                            maxWidth: '13em'
                          }}
                        >
                          <Image
                            alt={item ? item.product_name : ''}
                            src={item.images && item.images[0] ? item.images[0].url : ''}
                            width={'100%'}
                            height={'100%'}
                            layout="responsive"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={7}>
                        <Box component="div" sx={{ paddingTop: 10, paddingLeft: 20 }}>
                          <Link href={`/products/${item.id}`}>
                            <Typography variant="inherit" sx={{ margin: 0 }}>
                              name
                            </Typography>
                          </Link>
                          <Typography variant="inherit">{item?.price}</Typography>
                          <Typography variant="inherit" sx={{ color: '#007600' }}>
                            In Stock
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <CancelIcon
                      style={{ position: 'absolute', top: '-1%', right: '-0.2%' }}
                      onClick={() => handleDelete(item)}
                    />
                  </Paper>
                ))}
              </Grid>
            </Grid>
          </Box>
        )}
        <CarouselContainer />
      </Box>
    </Layout>
  )
}

export default Wishlist
