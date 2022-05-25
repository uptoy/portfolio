import { SubmitHandler, useForm } from 'react-hook-form'
import React from 'react'
import { ResetPasswordCredentials } from 'src/yup/type'
import { resetPasswordFormSchema } from 'src/yup/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/context/AuthContext'
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Typography,
  Container,
  Box,
  Grid,
  Checkbox
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Link from 'src/components/Link'
import { makeStyles } from '@material-ui/styles'
import Copyright from 'src/components/Copyright'
import theme from 'theme'

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function ResetPassword() {
  const classes = useStyles()
  const { resetPassword } = useAuth()
  // const [loading, setLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ResetPasswordCredentials>({
    resolver: yupResolver(resetPasswordFormSchema)
  })
  const handleResetPassword: SubmitHandler<ResetPasswordCredentials> = async (formData) => {
    // setLoading(true)
    await resetPassword(formData)
    // setLoading(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(handleResetPassword)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            // name="password"
            label="New Password"
            type="password"
            id="new_password"
            {...register('password')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            // name="confirm_password"
            label="Confirm Password"
            type="password"
            id="confirm_password"
            {...register('confirmPassword')}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Submit
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
