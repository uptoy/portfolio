import { TypeOf } from 'yup'
import { categoryFormSchema } from 'src/yup/schema'

export interface CategoryType extends TypeOf<typeof categoryFormSchema> {}
