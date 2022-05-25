import { TypeOf } from 'yup'
import { productFormSchema } from 'src/yup/schema'

export interface ProductType extends TypeOf<typeof productFormSchema> {}
