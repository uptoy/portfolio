import {TypeOf} from "yup"
import {signUpFormSchema} from "yub/schema"

export interface SignUpCredentials extends TypeOf<typeof signUpFormSchema> {}
