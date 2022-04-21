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

export default function MypageSetting() {
  const classes = useStyles()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  return <MypageLayout>setting</MypageLayout>
}
