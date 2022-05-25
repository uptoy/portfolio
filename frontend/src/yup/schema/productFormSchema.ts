import * as yup from "yup"

export const productFormSchema = yup.object({
  product_name: yup
    .string()
    .required("Name is a required field")
    .min(3, "Enter a name more than 3 character")
    .max(120, "Enter a name of less than 120 characters, abbreviate if necessary")
    .matches(/^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/, "Only half-width alphanumerical symbols can be used"),
  slug: yup.string(),
  brand: yup
    .string()
    .required("Brand is a required field")
    .min(3, "Enter a brand more than 3 character")
    .max(120, "Enter a brand of less than 120 characters, abbreviate if necessary")
    .matches(/^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/, "Only half-width alphanumerical symbols can be used"),
  price: yup.number().required("Price is a required field").min(0, "Enter a price more than 3"),
  category_id: yup
    .number()
    .required("Category is a required field")
    .min(0, "Enter a price more than 0"),
  count_in_stock: yup
    .number()
    .required("Stock is a required field")
    .min(0, "Enter a price more than 0"),
  description: yup
    .string()
    .required("Description is a required field")
    .min(0, "Enter a price more than 0"),
  files: yup.array(),
})

function isFileExists(file: any) {
  return !!file
}

function isValidFileSize(file: any) {
  const maxFileSize = 3000000
  if (!file?.size) return false
  if (file.size > maxFileSize) return false
  return true
}

function isValidFileType(file: any) {
  const maxFileSize = 3000000
  const supportedFileFormats = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
    "image/bmp",
    "image/webp",
  ]
  if (!file?.type) return false
  if (!supportedFileFormats.includes(file.type)) return false
  return true
}
