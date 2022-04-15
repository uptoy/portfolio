export interface Category {
  id: number
  category_name: string
}

export interface Product {
  id: number
  product_name: string
  slug: string
  brand: string
  price: number
  category_id: string
  count_in_stock: number
  description: string
  average_rating: number
  createdAt?: string
  updatedAt?: string
  // image: string
  // quantity: number
  // rating?: number
  // numReviews?: number
  // reviews?: IReview[]
}
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

// export interface Product {
//   id: number
//   title: string
//   user_id: string
// }

export interface Cart {
  id: number
  title: string
  user_id: string
}

export interface Wishlist {
  id: number
  title: string
  user_id: string
}

export interface User {
  uid: string
  name: string
  email: string
  profile_url: string
  // language: string;
  // theme: string;
  // currency: string;
  // is_email_verified: boolean;
}
