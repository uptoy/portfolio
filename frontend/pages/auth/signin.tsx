import React, { useState } from "react"
import { useCallback, useEffect } from "react"
import { useRouter } from "next/router"
import Router from "next/router"
import Link from "next/link"
import { Layout } from "components/common/organisms"
import { Input } from "components/common/atom/Input"
import { unwrapResult } from "@reduxjs/toolkit"
import { Button } from "components/common/atom/Button"
import { Form } from "components/common/atom/Form"
import { useForm } from "react-hook-form"
import { SignIn } from "features/auth/authSlice"
import { useAppDispatch } from "app/hooks"
import toast from "react-hot-toast"

interface SignInData {
  email: string
  password: string
}

const defaultValues = {
  email: "",
  password: ""
}

const SignInPage = () => {
  console.log("SignIn page")
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<SignInData>({
    defaultValues
  })
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async ({ email, password }: SignInData) => {
    try {
      setIsSubmitting(true)
      const result = await dispatch(SignIn({ email, password }))
      unwrapResult(result)
      setIsSubmitting(false)
      toast.success("Successfully logged in!")
      Router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }
  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/auth/profile")
  }, [])

  return (
    <Layout title="signin">
      {error && <p>{error}</p>}
      <p>SignIn</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email Address:"
          type="email"
          name="email"
          placeholder="Enter Email"
          ref={register("email")}
        />
        {errors.email && <span>Invalid Error Email</span>}

        <Input
          label="Password:"
          type="password"
          name="password"
          placeholder="Enter Password"
          ref={register("password")}
        />
        {errors.password && <span>Invalid Error Password</span>}

        <Button label="Submit" disabled={isSubmitting} />
      </Form>
      <div>
        <Link href="/auth/forgot-password">
          <a>Forgot Password?</a>
        </Link>
      </div>
      <div>
        <Link href="/auth/signup">
          <a>You still don't have account?</a>
        </Link>
      </div>
    </Layout>
  )
}

export default SignInPage
