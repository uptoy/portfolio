export type Status = 'idle' | 'loading' | 'succeed' | 'failed';

export interface DateRange {
  label: string;
  start_date: string;
  end_date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  language: string;
  theme: string;
  currency: string;
  is_email_verified: boolean;
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

  createdAt: string
  updatedAt?: string
}
