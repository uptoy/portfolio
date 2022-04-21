import {TypeOf} from "yup"
import {signInFormSchema} from "yub/schema"

export interface SignInCredentials extends TypeOf<typeof signInFormSchema> {}
