import React from 'react'
import {
  Typography,
  Container,
  Tooltip,
  Fab,
  TableRow,
  Pagination,
  TableCell,
  Table,
  TableBody,
  TableHead
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { grey, green, common } from '@mui/material/colors'

const grey500 = grey['500']
const green400 = green['400']
const white = common.white

interface DataTableProps {
  model: string
  items: { [key: string]: any }[]
  totalPages: number
  page: number
  headers: string[]
  dataKeys: string[]
  onPageChange: (_event: React.ChangeEvent<unknown>, page: number) => void
  onDelete: (_event: React.ChangeEvent<unknown>, id?: number) => void
}

function DataTable({ model, items, dataKeys, totalPages, page, headers, onPageChange, onDelete }: DataTableProps) {
  // =>
  const renderData = (dataKey: string, data: any) => {
    if (dataKey === 'avatar') {
      return <img width={35} src={data[dataKey]} />
    } else if (dataKey === 'membership') {
      return data[dataKey] ? <CheckCircleIcon /> : <CancelIcon />
    } else if (dataKey === 'actions') {
      return (
        <>
          <Tooltip title="Edit" aria-label="edit">
            <Fab
              size="small"
              sx={{
                marginRight: '1em',
                color: white,
                backgroundColor: green400
              }}
              href={model && model.includes('?path=/story/') ? `${model}` : `${model}/${data.id}`}
            >
              <CreateIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Delete" aria-label="delete">
            <Fab
              size="small"
              sx={{ color: 'grey', fill: grey500 }}
              value={data.id}
              onClick={(e) => onDelete(e, data.id)}
            >
              <DeleteIcon />
            </Fab>
          </Tooltip>
        </>
      )
    } else {
      if (dataKey.includes('.')) {
        const keys = dataKey.split('.')

        return <>{data[keys[0]][keys[1]]}</>
      } else return <>{data[dataKey]}</>
    }
  }

  const headerCount = headers.length

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.length > 0 &&
              headers.map((header) => (
                <TableCell key={header} component="th">
                  {header}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item.id}>
                {headers &&
                  dataKeys.map((dataKey) => (
                    <TableCell key={dataKey} component="th">
                      {renderData(dataKey, item)}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headerCount}>
                <Typography variant="inherit">No Data Found !</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {items.length > 0 && (
        <Container
          sx={{
            width: 350,
            margin: '0 auto',
            paddingTop: 10
          }}
        >
          <Pagination
            // size="small"
            count={totalPages}
            page={page}
            variant="outlined"
            color="primary"
            onChange={onPageChange}
          />
        </Container>
      )}
    </React.Fragment>
  )
}

export default DataTable
