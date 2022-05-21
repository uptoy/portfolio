export interface Category {
  id: number
  category_name: string
  created_at: Date
  updated_at: Date
}

export interface User {
  uid: string
  username: string
  email: string
  profile_url: string
  created_at?: Date
  updated_at?: Date
}

export interface Address {
  id: number
  address: string
  city: string
  state: string
  country: string
  zip: string
  created_at: Date
  updated_at: Date
}

export interface Product {
  id?: number
  product_name: string
  slug: string
  brand: string
  price: number
  category_id: number
  count_in_stock: number
  description: string
  createdAt?: Date | null
  updatedAt?: Date | null
  images: Image[]
  reviews: Review[]
  category: Category
}

export interface Review {
  id: number
  title: string
  comment: string
  // name: string
  rating: number
  created_at: Date
  updated_at: Date
}
export interface Image {
  id: number
  product_id: number
  url: string
  createdAt?: Date | null
  updatedAt?: Date | null
}
export type Status = "idle" | "loading" | "succeed" | "failed"

export interface DateRange {
  label: string
  start_date: string
  end_date: string
}

export interface CartItem {
  id?: number
  cart_id?: number
  product_id: number
  quantity: number
  created_at?: Date
  updated_at?: Date
  product?: Product
}

export interface Order {
  id: number
  user_id: string
  address: string
  total_price: string
  shipping_address: string
  shipping_state: string
  shipping_country: string
  shipping_zip: string
  shipped_at: Date
  created_at: Date
}

export interface OrderDetail {
  id: number
  order_id: number
  product_id: number
  quantity: number
  sub_price: number
}

// ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (uid);

// CREATE TABLE order_detail (
//   order_id INTEGER NOT NULL,
//   product_id INTEGER NOT NULL,
//   quantity INTEGER NOT NULL,
//   sub_price INTEGER NOT NULL,
//   PRIMARY KEY (order_id, product_id)
// );

// export interface IOrderItems {
//   name: string
//   quantity: number
//   image: string
//   price: number
//   id?: string
// }

// export interface IPaymentResult {
//   id: string
//   email_address: string
//   status: string
// }

// export interface IOrder {
//   user: IUser
//   orderItems: Array<IOrderItems>
//   shippingAddress: ShippingAddressType
//   paymentMethod: string
//   paymentResult?: IPaymentResult
//   itemsPrice: number
//   shippingPrice: number
//   taxPrice: number
//   totalPrice: number
//   isPaid: boolean
//   isDelivered: boolean
//   paidAt?: string
//   deliveredAt?: string
//   id?: string
//   createdAt?: string
//   updatedAt?: string
// }

// export type ShippingAddressType = {
//   fullName: string
//   address: string
//   city: string
//   postalCode: string
//   country: string
// }

// //user
// export type UserSubmitForm = {
//   name: string
//   email: string
//   password: string
//   confirmPassword: string
// }
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
//   id: string
//   createdAt: string
//   updatedAt?: string
// }

// export interface IAuthUser extends IUser {
//   token: string
// }

// export interface IOrderItems {
//   name: string
//   quantity: number
//   image: string
//   price: number
//   id?: string
// }

// export interface IUser {
//   name: string
//   email: string
//   password: string
//   isAdmin: boolean
//   id: string
//   createdAt: string
//   updatedAt: string
// }

// export interface IOrderItems {
//   name: string
//   quantity: number
//   image: string
//   price: number
//   id?: string
// }
// export interface IPaymentResult {
//   id: string
//   email_address: string
//   status: string
// }

// export interface IOrder {
//   user: IUser
//   orderItems: Array<IOrderItems>
//   shippingAddress: ShippingAddressType
//   paymentMethod: string
//   paymentResult?: IPaymentResult
//   itemsPrice: number
//   shippingPrice: number
//   taxPrice: number
//   totalPrice: number
//   isPaid: boolean
//   isDelivered: boolean
//   paidAt?: string
//   deliveredAt?: string
//   id?: string
//   createdAt?: string
//   updatedAt?: string
// }

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
//   id: string
//   createdAt: string
//   updatedAt?: string
// }

// export interface IAuthUser extends IUser {
//   token: string
// }

// export interface IOrderItems {
//   name: string
//   quantity: number
//   image: string
//   price: number
//   id?: string
// }

// export interface IUser {
//   name: string
//   email: string
//   password: string
//   isAdmin: boolean
//   id: string
//   createdAt: string
//   updatedAt: string
// }

// export interface IOrderItems {
//   name: string
//   quantity: number
//   image: string
//   price: number
//   id?: string
// }
// export interface IPaymentResult {
//   id: string
//   email_address: string
//   status: string
// }

// export interface IOrder {
//   user: IUser
//   orderItems: Array<IOrderItems>
//   shippingAddress: ShippingAddressType
//   paymentMethod: string
//   paymentResult?: IPaymentResult
//   itemsPrice: number
//   shippingPrice: number
//   taxPrice: number
//   totalPrice: number
//   isPaid: boolean
//   isDelivered: boolean
//   paidAt?: string
//   deliveredAt?: string
//   id?: string
//   createdAt?: string
//   updatedAt?: string
// }

// // export interface Product {
// //   id: number
// //   title: string
// //   user_id: string
// // }

// export interface Cart {
//   id: number
//   title: string
//   user_id: string
// }

// export interface Wishlist {
//   id: number
//   title: string
//   user_id: string
// }

// export interface User {
//   uid: string
//   name: string
//   email: string
//   profile_url: string
//   // language: string;
//   // theme: string;
//   // currency: string;
//   // is_email_verified: boolean;
// }
