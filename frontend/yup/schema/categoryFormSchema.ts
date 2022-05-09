import * as yup from "yup"

export const categoryFormSchema = yup.object({
  category_name: yup
    .string()
    .required("Category is a required field")
    .min(3, "Enter a name more than 3 character")
    .max(120, "Enter a name of less than 120 characters, abbreviate if necessary")
    .matches(/^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/, "Only half-width alphanumerical symbols can be used"),
  created_at: yup.date().required("Created At is a required field"),
  updated_at: yup.date().required("Updated At is a required field"),
})
