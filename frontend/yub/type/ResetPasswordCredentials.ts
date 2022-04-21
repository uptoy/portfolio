import {TypeOf} from "yup"
import {resetPasswordFormSchema} from "yub/schema"

export interface ResetPasswordCredentials extends TypeOf<typeof resetPasswordFormSchema> {}
