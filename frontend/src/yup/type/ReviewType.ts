import { TypeOf } from 'yup'
import { reviewFormSchema } from 'src/yup/schema'

export interface ReviewType extends TypeOf<typeof reviewFormSchema> {}
