import {TypeOf} from "yup"
import {categoryFormSchema} from "yup/schema"

export interface CategoryType extends TypeOf<typeof categoryFormSchema> {}
