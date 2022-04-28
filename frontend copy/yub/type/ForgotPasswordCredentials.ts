import {TypeOf} from "yup"
import {forgotPasswordFormSchema} from "yub/schema"

export interface ForgotPasswordCredentials extends TypeOf<typeof forgotPasswordFormSchema> {}
