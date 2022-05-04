import {TypeOf} from "yup"
import {productFormSchema} from "yup/schema"

export interface ProductType extends TypeOf<typeof productFormSchema> {}
