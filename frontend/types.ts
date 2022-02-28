export interface Task {
  _id?: string
  title: string
  tag: number
  tag_name: string
  created_at: string
  updated_at: string
}
export interface EditTask {
  _id?: string
  title: string
  tag: number
}

export interface Tag {
  _id?: string
  name: string
}
// export interface Post {
//   _id?: string
//   title: string
//   content: string
//   username: string
//   tags: Tag[]
//   created_at: string
// }

export interface Category {
  _id?: string
  title: string
  user_id: string
}

export interface IBlog {
  _id?: string
  username: string | IUser
  title: string
  content: string
  description: string
  thumbnail: string | File
  category: string
  createdAt: string
}

export interface IUser {
  _id?: string
  username: string
  email: string
}

export interface IUserSignIn {
  email: string
  password: string
}
export interface IUserSignUp {
  username: string
  email: string
  password: string
  password_confirm: string
}

export interface IBlog {
  _id?: string
  user: string | IUser
  title: string
  content: string
  description: string
  thumbnail: string | File
  category: string
  createdAt: string
}

export interface IParams {
  page: string
  slug: string
}

export interface Category {
  id: string;
  title: string;
  user_id: string;
}

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
