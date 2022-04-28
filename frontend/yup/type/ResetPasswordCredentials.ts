import {TypeOf} from "yup"
import {resetPasswordFormSchema} from "yup/schema"

export interface ResetPasswordCredentials extends TypeOf<typeof resetPasswordFormSchema> {}
