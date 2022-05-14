import {TypeOf} from "yup"
import {reviewFormSchema} from "yup/schema"

export interface ReviewType extends TypeOf<typeof reviewFormSchema> {}
