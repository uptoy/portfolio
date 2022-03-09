import {
  IOrder,
  IProduct,
  IOrderItems,
  IReview,
  IUser,
  IPaymentResult,
  ShippingAddressType,
} from "types"

//User
export const user1: IUser = {
  name: "username1",
  email: "email",
  password: "password",
  isAdmin: true,
  _id: "_id1",
  createdAt: "createdAt:2022,0309,2141",
  updatedAt: "updatedAt:2022,0309,2141",
}
export const user2: IUser = {
  name: "username2",
  email: "email2",
  password: "password",
  isAdmin: false,
  _id: "_id2",
  createdAt: "createdAt:2022,0309,2141",
  updatedAt: "updatedAt:2022,0309,2141",
}
export const users: IUser[] = [user1, user2]

//Review
export const review1: IReview = {
  _id: "_id",
  username: user1.name,
  rating: 4,
  createdAt: "createdAt:2022,0309,2141",
  comment: "text1text1text1",
}
export const review2 = {
  _id: "_id",
  username: user2.name,
  rating: 4,
  createdAt: "createdAt:2022,0309,2141",
  comment: "text2text2text2",
}
export const review3: IReview = {
  _id: "_id2",
  username: user1.name,
  rating: 3,
  createdAt: "createdAt:2022,0309,2141",
  comment: "text3text3text3",
}
export const review4 = {
  _id: "_id4",
  username: user2.name,
  rating: 4,
  createdAt: "createdAt:2022,0309,2141",
  comment: "text4text4text4",
}
export const reviews1: IReview[] = [review1, review2]
export const reviews2: IReview[] = [review3, review4]

//Product
export const product1: IProduct = {
  _id: "1",
  quantity: 1,
  name: "name1",
  slug: "slug1",
  category: "category",
  image: "http://placehold.jp/150x150.png",
  price: 1,
  brand: "brand",
  rating: 3,
  countInStock: 1,
  numReviews: 1,
  description: "desc",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  reviews: reviews1,
}
export const product2: IProduct = {
  _id: "2",
  quantity: 2,
  name: "name2",
  slug: "slug2",
  category: "category2",
  image: "http://placehold.jp/150x150.png",
  price: 2,
  brand: "brand2",
  rating: 2,
  countInStock: 2,
  numReviews: 2,
  description: "desc2",
  createdAt: "createdAt2",
  updatedAt: "updatedAt2",
  reviews: reviews2,
}
export const products: IProduct[] = [product1, product2]

//Payment
export const paymentResult: IPaymentResult = {
  id: "id",
  email_address: "email_address",
  status: "status",
}

//Shipping Address
export const shippingAddress: ShippingAddressType = {
  fullName: "fullName",
  address: "address",
  city: "city",
  country: "country",
  postalCode: "postalCode",
}

//OrderItem
export const item1: IOrderItems = {
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

//Order
export const order1: IOrder = {
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
export const order2: IOrder = {
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
export const orders: IOrder[] = [order1, order2]



export const mainFeaturedPost = {
  title: "Welcome to my Portfolio",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
}

export const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
]
