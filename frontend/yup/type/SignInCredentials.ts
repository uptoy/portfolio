import {TypeOf} from "yup"
import {signInFormSchema} from "yup/schema"

export interface SignInCredentials extends TypeOf<typeof signInFormSchema> {}
