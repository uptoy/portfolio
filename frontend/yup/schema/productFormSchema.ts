import * as yup from "yup"

export const productFormSchema = yup.object({
  product_name: yup
    .string()
    .required("Name is a required field")
    .min(3, "Enter a name more than 3 character")
    .max(120, "Enter a name of less than 120 characters, abbreviate if necessary"),
  brand: yup
    .string()
    .required("Brand is a required field")
    .min(3, "Enter a brand more than 3 character")
    .max(120, "Enter a brand of less than 120 characters, abbreviate if necessary"),
  price: yup.number().required("Price is a required field").min(0, "Enter a price more than 3"),
  category_id: yup
    .number()
    .required("Category is a required field")
    .min(0, "Enter a price more than 0"),
  count_in_stock: yup
    .number()
    .required("Stock is a required field")
    .min(0, "Enter a price more than 0"),
})
