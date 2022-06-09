import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import theme from 'src/theme'
import { CarouselContainer } from 'src/components'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'
import { Paper } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Layout } from 'src/components/organisms'
import { red, common } from '@material-ui/core/colors'
import { Product } from 'src/@types'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Link } from 'src/components'
import toast from 'react-hot-toast'
import CancelIcon from '@material-ui/icons/Cancel'
const BaseURL = 'http://localhost:8080/api'

const useStyles: any = makeStyles(() => ({
  cardGrid: {
    padding: theme.spacing(4, 0)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '80%'
  },
  cardContent: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0.25)
  },
  cardActions: {
    justifyContent: 'space-between'
  },
  numReviews: {
    marginLeft: theme.spacing(1),
    color: common.black
  },
  favorite: {
    minWidth: 30,
    color: red[500],
    marginRight: theme.spacing(1),
    fontSize: '2em'
  },
  paper: {
    marginBottom: '1em',
    position: 'relative'
  },
  emptyPaper: {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary
  }
}))

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
  const res = await fetch(`${BaseURL}/products`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  const products = await res.json()
  const res1 = await fetch(`${BaseURL}/wishlist`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
  const wishlist = await res1.json()
  return { props: { products, wishlist } }
}

const Wishlist: NextPage = ({ products, wishlist }: any) => {
  const fetcher = (url: any) =>
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then((r) => r.json())
  const { data, mutate } = useSWR(`${BaseURL}/wishlist`, fetcher, {
    fallbackData: wishlist,
    revalidateOnMount: true
  })
  const router = useRouter()
  const classes = useStyles()
  const fetchWishlist = data.data
  const WishlistDelete = async (product: Product) => {
    try {
      await fetch(`${BaseURL}/wishlist/${product.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.log('Failed', err.message)
      } else {
        console.log('Unknown Failure', err)
      }
    }
  }

  const handleDelete = async (product: Product) => {
    await WishlistDelete(product)
    await mutate({ ...data, product })
  }
  return (
    <Layout>
      <div style={{ marginTop: '2em', marginBottom: '2em' }}>
        {fetchWishlist?.length === 0 ? (
          <Paper className={classes.emptyPaper}>
            <p>Wishlist is empty.</p>
            <Link href="/">Go shopping</Link>
          </Paper>
        ) : (
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                {fetchWishlist?.map((item: Product, index: number) => (
                  <Paper className={classes.paper} key={index}>
                    <Grid container xs={12} sm={12}>
                      <Grid item xs={5} style={{ minWidth: '7em', maxWidth: '13em' }}>
                        <div
                          style={{
                            width: '30vw',
                            height: '100%',
                            minHeight: '8em',
                            minWidth: '8em',
                            maxHeight: '13em',
                            maxWidth: '13em'
                          }}
                        >
                          <Image
                            alt={item?.product_name}
                            src={item?.images[0].url as string}
                            width={'100%'}
                            height={'100%'}
                            layout="responsive"
                          />
                        </div>
                      </Grid>
                      <Grid item xs={7}>
                        <div style={{ paddingTop: 10, paddingLeft: 20 }}>
                          <Link href={`/products/${item.id}`}>
                            <p style={{ margin: 0 }}>name</p>
                          </Link>
                          <p>{item?.price}</p>
                          <p style={{ color: '#007600' }}>In Stock</p>
                        </div>
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
          </div>
        )}
        <CarouselContainer />
      </div>
    </Layout>
  )
}

export default Wishlist
