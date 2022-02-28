import { ChangeEvent, FormEvent, useState, VFC } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Layout } from "components/common/organisms"
import { Input } from "components/common/atom/Input"
import { Button } from "components/common/atom/Button"
import { Form } from "components/common/atom/Form"

const ForgotPassword: VFC = () => {
  console.log("ForgotPassword page")
  const [email, setEmail] = useState("")
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email)
  }
  return (
    <Layout title="ForgetPassword">
      <Form onSubmit={handleSubmit}>
        <Input
          label="Email:"
          type="email"
          name="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value)
          }}
          placeholder="Enter Email"
        />
        <Button disabled={!email} label="Submit" />
      </Form>
      <Link href="/">
        <a>Back to Top Page</a>
      </Link>
    </Layout>
  )
}

export default ForgotPassword
