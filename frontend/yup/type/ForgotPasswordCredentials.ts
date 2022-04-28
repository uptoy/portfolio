import {TypeOf} from "yup"
import {forgotPasswordFormSchema} from "yup/schema"

export interface ForgotPasswordCredentials extends TypeOf<typeof forgotPasswordFormSchema> {}
