import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/styles"
import { AdminDashboardLayout } from "components/dashboard"
import theme from "theme"
import { Button, TextField, Grid } from "@material-ui/core"
import { createStyles } from "@material-ui/core/styles"

const useStyles: any = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
      flexGrow: 1,
    },
    submit: {
      margin: theme.spacing(3, 1, 2),
      padding: theme.spacing(1, 5),
    },
    submit_container: {
      textAlign: "end",
      paddingTop: 0,
    },
  })
)

export default function AdminCustomerList() {
  const classes = useStyles()
  return (
    <AdminDashboardLayout>
      <Grid container spacing={4}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              autoFocus
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} className={classes.submit_container}>
            <Button variant="contained" className={classes.submit}>
              Back
            </Button>
            <Button variant="contained" className={classes.submit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* <form className={classes.form} noValidate>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoFocus
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            autoFocus
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            autoFocus
          />
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/auth/signin" variant="body2">
              Already have an account?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/auth/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form> */}
    </AdminDashboardLayout>
  )
}
