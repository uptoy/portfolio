import * as yup from "yup"

export const reviewFormSchema = yup.object({
  title: yup
    .string()
    .required("Title is a required field")
    .min(3, "Enter a title more than 3 character")
    .max(120, "Enter a title of less than 120 characters, abbreviate if necessary")
    .matches(/^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/, "Only half-width alphanumerical symbols can be used"),
  comment: yup
    .string()
    .required("Comment is a required field")
    .min(3, "Enter a comment more than 3 character")
    .max(120, "Enter a comment of less than 120 characters, abbreviate if necessary")
    .matches(/^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/, "Only half-width alphanumerical symbols can be used"),
  rating: yup.number().required("Rating is a required field"),
})
