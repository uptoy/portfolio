import { IProduct, IOrderItems } from "types"

const review1=""
const review2=""
const reviews =[review1,review2]
export const product: any = {
  _id: "1",
  quantity: 1,
  name: "name1",
  slug: "slug1",
  category: "category",
  image: "http://placehold.jp/150x150.png",
  price: 1,
  brand: "brand",
  rating: 1,
  countInStock: 1,
  numReviews: 1,
  description: "desc",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  averageRating: 1,
  reviews : reviews
}



const item1: IOrderItems = {
  _id: "1",
  name: "name1",
  quantity: 1,
  price: 100,
  image: "http://placehold.jp/150x150.png",
}
const item2: IOrderItems = {
  _id: "2",
  name: "name2",
  quantity: 2,
  price: 200,
  image: "http://placehold.jp/150x150.png",
}
export const orderItems: IOrderItems[] = [item1, item2]

const paymentResult = {
  id: "id",
  email_address: "email_address",
  status: "status",
}
export const shippingAddress = {
  fullName: "fullName",
  address: "address",
  city: "city",
  country: "country",
  postalCode: "postalCode",
}

const user1 = {
  name: "name",
  email: "email",
  password: "password",
  isAdmin: true,
  _id: "_id1",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
}
const user2 = {
  name: "name2",
  email: "email2",
  password: "password",
  isAdmin: false,
  _id: "_id2",
  createdAt: "createdAt2",
  updatedAt: "updatedAt2",
}

const order1 = {
  user: user1,
  orderItems: orderItems,
  shippingAddress: shippingAddress,
  paymentMethod: "paymentMethod",
  paymentResult: paymentResult,
  itemsPrice: 1,
  _id: "_id",
  createdAt: "createdAt",
  shippingPrice: 1,
  taxPrice: 1,
  totalPrice: 1,
  isPaid: true,
  paidAt: "paidAt",
  isDelivered: true,
  deliveredAt: "deliveredAt",
  updatedAt: "updatedAt",
}
const order2 = {
  user: user2,
  orderItems: orderItems,
  shippingAddress: shippingAddress,
  paymentMethod: "paymentMethod",
  paymentResult: paymentResult,
  itemsPrice: 1,
  _id: "_id",
  createdAt: "createdAt",
  shippingPrice: 1,
  taxPrice: 1,
  totalPrice: 1,
  isPaid: true,
  paidAt: "paidAt",
  isDelivered: true,
  deliveredAt: "deliveredAt",
  updatedAt: "updatedAt",
}
export const orders = [order1, order2]
