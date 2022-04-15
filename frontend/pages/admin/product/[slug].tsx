import React from "react"
import clsx from "clsx"
import {makeStyles} from "@material-ui/styles"
import {AdminLayout} from "components/dashboard"
import theme from "theme"
import {Button, TextField, Grid} from "@material-ui/core"
import {createStyles} from "@material-ui/core/styles"

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

export default function AdminProductDetail() {
  const classes = useStyles()
  return (
    <AdminLayout>
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
    </AdminLayout>
  )
}
