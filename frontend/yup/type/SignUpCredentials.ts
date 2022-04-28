import {TypeOf} from "yup"
import {signUpFormSchema} from "yup/schema"

export interface SignUpCredentials extends TypeOf<typeof signUpFormSchema> {}
