import * as yup from 'yup';

export const signUpFormSchema = yup.object({
  username: yup
    .string()
    .required('Username is a required field')
    .min(3, 'Enter a name more than 3 character')
    .max(
      120,
      'Enter a name of less than 120 characters, abbreviate if necessary'
    ),
  email: yup
    .string()
    .required('Email is a required field')
    .email('Email must be a valid email'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(5, 'Enter a password more than 5 character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

