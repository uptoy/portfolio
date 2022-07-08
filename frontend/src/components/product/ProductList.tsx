import { CircularProgress } from '@mui/material'

import React from 'react'
// import createStyles from '@material-ui/styles/createStyles'
// import { makeStyles } from '@material-ui/styles'
import ProductItem from './ProductItem'
import useSWR from 'swr'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
// import { fetcher } from 'src/pages/admin/product/add'
import { IProduct } from 'src/@types'
import { BaseURL } from '@/common'

// const useStyles: any = makeStyles(() =>
//   createStyles({
//     container: {
//       height: '83%'
//     },
//     loadingContainer: {
//       textAlign: 'center',
//       margin: '100px 0'
//     }
//   })
// )
const ProductList = () => {
  // const classes = useStyles()
  // const { data, error, mutate } = useSWR(`${BaseURL}/products`, fetcher)
  // const products = data?.data
  // if (error) return <div>failed to load</div>
  // if (!data) {
  //   return (
  //     <Box
  //       sx={{
  //         textAlign: 'center',
  //         margin: '100px 0'
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   )
  // }
  return (
    <>
      {/* {products && (
        <TableContainer
          component={Paper}
          sx={{
            height: '83%'
          }}
        >
          <Table aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ padding: 5 }}>
                  ID
                </TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell align="center">Stock </TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product: Product) => (
                <ProductItem key={product.id} product={product} mutate={mutate} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && <Typography variant="inherit">Oops, something went wrong</Typography>} */}
    </>
  )
}
export default ProductList
