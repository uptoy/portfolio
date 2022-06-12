import * as yup from "yup"


export const forgotPasswordFormSchema = yup.object({
  email: yup.string().required("Email is a required field").email("Email must be a valid email"),
})

