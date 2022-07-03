import { CircularProgress } from '@mui/material'

import React from 'react'
import CategoryItem from './CategoryItem'
import useSWR from 'swr'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
// import { fetcher } from 'src/pages/admin/product/add'
import { Category } from 'src/@types'
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
const CategoryList = () => {
  // const classes = useStyles()
  // const { data, error, mutate } = useSWR(`${BaseURL}/categories`, fetcher)
  // const categories = data?.data
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
      {/* {categories && (
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
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Updated At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category: Category) => (
                <CategoryItem key={category.id} category={category} mutate={mutate} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && <Typography variant="inherit">Oops, something went wrong</Typography>} */}
    </>
  )
}
export default CategoryList
