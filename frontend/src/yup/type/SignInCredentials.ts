import { TypeOf } from 'yup'
import { signInFormSchema } from 'src/yup/schema'

export interface SignInCredentials extends TypeOf<typeof signInFormSchema> {}
