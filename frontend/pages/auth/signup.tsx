import React, { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Layout } from 'components/common/organisms'
import { Input } from 'components/common/atom/Input'
import { unwrapResult } from '@reduxjs/toolkit'
import { Button } from 'components/common/atom/Button'
import { Form } from 'components/common/atom/Form'
import { useForm } from 'react-hook-form'
import { SignUp } from 'features/auth/authSlice'
import { useAppDispatch } from 'app/hooks'
import toast from 'react-hot-toast'

interface SignUpData {
  email: string
  username: string
  password: string
  password_confirm: string
}

const defaultValues = {
  email: 'email@email.com',
  username: 'username',
  password: 'password',
  password_confirm: 'password',
}

const SignUpPage = () => {
  console.log('SignUp page')
  const { register, handleSubmit, formState: { errors }} = useForm<SignUpData>({
    defaultValues,
  })
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async ({ email, username, password, password_confirm }: SignUpData) => {
    try {
      setIsSubmitting(true)
      const result = await dispatch(SignUp({ email, username, password, password_confirm }))
      unwrapResult(result)
      setIsSubmitting(false)
      toast.success('Successfully logged in!')
      Router.push('/dashboard')
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }
  return (
    <Layout title="signup">
      {error && <p>{error}</p>}
      <p>SignIn</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email Address:"
          type="email"
          name="email"
          placeholder="Enter Email"
          ref={register('email')}
        />
        {errors.email && <span>Invalid Error Email</span>}
        <Input
          label="Username:"
          type="text"
          name="username"
          placeholder="Enter Username"
          ref={register('username')}
        />
        {errors.email && <span>Invalid Error Email</span>}

        <Input
          label="Password:"
          type="password"
          name="password"
          placeholder="Enter Password"
          ref={register('password')}
        />
        {errors.password && <span>Invalid Error Password</span>}
        <Input
          label="Password Confirm:"
          type="password"
          name="password_confirm"
          placeholder="Enter Password Confirm"
          ref={register('password_confirm')}
        />
        {errors.password && <span>Invalid Error Password Confirm</span>}

        <Button label="Submit" disabled={isSubmitting} />
      </Form>
      <div>
        <Link href="/auth/signin">
          <a>You already have account?</a>
        </Link>
      </div>
    </Layout>
  )
}

export default SignUpPage
