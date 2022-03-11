import * as React from "react"
import { TextField, Button, List, ListItem, Typography, Card } from "@material-ui/core"
import { MypageLayout } from "components/organisms/mypage"
import { Controller, useForm } from "react-hook-form"
import { makeStyles } from "@material-ui/styles"
import theme from "theme"

{
  /* <ListItem selected button component="a"></ListItem> */
}

const useStyles: any = makeStyles(() => ({
  container: {
    marginTop: theme.spacing(2),
  },
}))

export default function MypageIndex() {
  const classes = useStyles()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  return (
    <MypageLayout>
      <Card>
        <List>
          <ListItem>
            <Typography>MypageTop</Typography>
          </ListItem>
          <ListItem>
            <form onSubmit={() => {}}>
              <List>
                <ListItem>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Name"
                        inputProps={{ type: "name" }}
                        error={Boolean(errors.name)}
                        helperText={
                          errors.name
                            ? errors.name.type === "minLength"
                              ? "Name length is more than 1"
                              : "Name is required"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email"
                        inputProps={{ type: "email" }}
                        error={Boolean(errors.email)}
                        helperText={
                          errors.email
                            ? errors.email.type === "pattern"
                              ? "Email is not valid"
                              : "Email is required"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: (value) =>
                        value === "" || value.length > 5 || "Password length is more than 5",
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="password"
                        label="Password"
                        inputProps={{ type: "password" }}
                        error={Boolean(errors.password)}
                        helperText={errors.password ? "Password length is more than 5" : ""}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: (value) =>
                        value === "" ||
                        value.length > 5 ||
                        "Confirm Password length is more than 5",
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        inputProps={{ type: "password" }}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.password ? "Confirm Password length is more than 5" : ""}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Button variant="contained" type="submit" fullWidth color="primary">
                    Update
                  </Button>
                </ListItem>
              </List>
            </form>
          </ListItem>
        </List>
      </Card>
    </MypageLayout>
  )
}
