export type Status = "idle" | "loading" | "succeed" | "failed"

export interface DateRange {
  label: string
  start_date: string
  end_date: string
}

export interface IReview {
  _id: string
  username: string
  rating: number
  createdAt: string
  comment: string
}

export interface IProduct {
  _id: string
  quantity: number
  name: string
  slug: string
  category: string
  image: string
  price: number
  brand: string
  rating: number
  countInStock: number
  description: string
  numReviews: number
  createdAt?: string
  updatedAt: string
  reviews: IReview[]
}

// export interface IReviews {
//   name: string
//   comment: string
// }

export interface IOrderItems {
  name: string
  quantity: number
  image: string
  price: number
  _id?: string
}

export interface IPaymentResult {
  id: string
  email_address: string
  status: string
}

export interface IOrder {
  user: IUser
  orderItems: Array<IOrderItems>
  shippingAddress: ShippingAddressType
  paymentMethod: string
  paymentResult?: IPaymentResult
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  paidAt?: string
  deliveredAt?: string
  _id?: string
  createdAt?: string
  updatedAt?: string
}

export type ShippingAddressType = {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

//user
export type UserSubmitForm = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface User {
  id: string
  name: string
  email: string
  language: string
  theme: string
  currency: string
  is_email_verified: boolean
}

export interface DateRange {
  label: string
  start_date: string
  end_date: string
}

export interface Product {
  id: string
  title: string
  user_id: string
}

// export interface IUser {
//   id: string
//   name: string
//   email: string
//   language: string
//   theme: string
//   currency: string
//   is_email_verified: boolean
// }
// export interface IUser {
//   name: string
//   email: string
//   password: string
//   isAdmin: boolean
//   _id: string
//   createdAt: string
//   updatedAt?: string
// }

export interface IAuthUser extends IUser {
  token: string
}

export interface IOrderItems {
  name: string
  quantity: number
  image: string
  price: number
  _id?: string
}

export interface IUser {
  name: string
  email: string
  password: string
  isAdmin: boolean
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IOrderItems {
  name: string
  quantity: number
  image: string
  price: number
  _id?: string
}
export interface IPaymentResult {
  id: string
  email_address: string
  status: string
}

export interface IOrder {
  user: IUser
  orderItems: Array<IOrderItems>
  shippingAddress: ShippingAddressType
  paymentMethod: string
  paymentResult?: IPaymentResult
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  paidAt?: string
  deliveredAt?: string
  _id?: string
  createdAt?: string
  updatedAt?: string
}

export interface ICategory {
  id: string
  title: string
  user_id: string
}

export interface Category {
  id: string;
  title: string;
  user_id: string;
}
