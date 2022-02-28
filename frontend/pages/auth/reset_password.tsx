import React from 'react'
import ReactDOM from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface IFormInput {
  firstName: String
  gender: GenderEnum
}

export default function ResetPassword() {
  const { register, handleSubmit } = useForm<IFormInput>();
  console.log("aaaaaaaaa")
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
  return (
    <>
      <p>reset password</p>
      <Link href="/">
        <a>ホームに戻る</a>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input {...register('firstName')} />
        <label>Gender Selection</label>
        <select {...register('gender')}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        <input type="submit" />
      </form>
    </>
  )
}
