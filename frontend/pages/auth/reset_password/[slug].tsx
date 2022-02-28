import React, { useState } from "react"
// import { useRouter, Router } from "next/router"
import Link from "next/link"
import { Layout } from "components/common/organisms"
import { Input } from "components/common/atom/Input"
import { unwrapResult } from "@reduxjs/toolkit"
import { Button } from "components/common/atom/Button"
import { Form } from "components/common/atom/Form"
import { useForm } from "react-hook-form"
import { resetPassword } from "services/apiAuth"
import toast from "react-hot-toast"
// import { NextApiRequest } from "next"

interface ResetPasswordData {
  password: string
  password_confirm: string
}
const defaultValues = {
  password: "",
  password_confirm: ""
}

const ResetPasswordPage = async (req: any) => {
  console.log("ResetPassword page")
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordData>({
    defaultValues
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const token = req.headers.authorization
  // const router = useRouter()
  // const token = router.query

  const onSubmit = async (fields: ResetPasswordData) => {
    try {
      setIsSubmitting(true)
      await resetPassword({ ...fields, token })
      setIsSubmitting(false)
      toast.success("Successfully reset your password")
      // Router.push("/signup")
    } catch (err: any) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }
  return (
    <Layout title="reset-password">
      {error && <p>{error}</p>}
      <p>ResetPassword</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Password:"
          type="password"
          name="password"
          placeholder="Enter Password"
          ref={register("password")}
        />
        {errors.password && <span>Invalid Error Password</span>}
        <Input
          label="Password Confirm:"
          type="password"
          name="password_confirm"
          placeholder="Enter Password Confirm"
          ref={register("password_confirm")}
        />
        {errors.password && <span>Invalid Error Password Confirm</span>}
        <Button label="Submit" disabled={isSubmitting} />
      </Form>
      <div>
        <Link href="/">
          <a>Back to Top Page</a>
        </Link>
      </div>
    </Layout>
  )
}

export default ResetPasswordPage
