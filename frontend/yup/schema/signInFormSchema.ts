import * as yup from "yup"


export const signInFormSchema = yup.object({
  email: yup.string().required("Email is a required field").email("Email must be a valid email"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(5, "Enter a password more than 5 character"),
})

