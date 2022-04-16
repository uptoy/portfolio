import type { NextPage } from "next"
import NextLink from "next/link"
import { orders } from "utils/seed"
import { IOrder } from "types"
import * as React from "react"
import {
  TableContainer,
  Button,
  List,
  ListItem,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@material-ui/core"
import { MypageLayout } from "components/organisms/mypage"
import { useForm } from "react-hook-form"

const OrderHistory: NextPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const loading = false
  const error = false
  return (
    <MypageLayout>
      <Card>
        <List>
          <ListItem>
            <Typography>
              Order History
            </Typography>
          </ListItem>
          <ListItem>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography>{error}</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>TOTAL</TableCell>
                      <TableCell>PAID</TableCell>
                      <TableCell>DELIVERED</TableCell>
                      <TableCell>ACTION</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(orders as IOrder[]).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id?.substring(20, 24)}</TableCell>
                        <TableCell>{order.createdAt}</TableCell>
                        <TableCell>${order.totalPrice}</TableCell>
                        <TableCell>
                          {order.isPaid ? `paid at ${order.paidAt}` : "not paid"}
                        </TableCell>
                        <TableCell>
                          {order.isDelivered
                            ? `delivered at ${order.deliveredAt}`
                            : "not delivered"}
                        </TableCell>
                        <TableCell>
                          <NextLink href={`/order/${order.id}`} passHref>
                            <Button variant="contained">Details</Button>
                          </NextLink>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </ListItem>
        </List>
      </Card>
    </MypageLayout>
  )
}

export default OrderHistory
