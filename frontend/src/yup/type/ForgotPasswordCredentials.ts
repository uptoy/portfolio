import { TypeOf } from 'yup'
import { forgotPasswordFormSchema } from 'src/yup/schema'

export interface ForgotPasswordCredentials extends TypeOf<typeof forgotPasswordFormSchema> {}
