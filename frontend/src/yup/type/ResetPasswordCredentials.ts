import { TypeOf } from 'yup'
import { resetPasswordFormSchema } from 'src/yup/schema'

export interface ResetPasswordCredentials extends TypeOf<typeof resetPasswordFormSchema> {}
