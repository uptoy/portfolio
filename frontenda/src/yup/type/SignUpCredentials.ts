import { TypeOf } from 'yup'
import { signUpFormSchema } from 'src/yup/schema'

export interface SignUpCredentials extends TypeOf<typeof signUpFormSchema> {}
