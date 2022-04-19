import * as React from "react"
import {List, ListItem, Card, ListItemText} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import theme from "theme"
import NextLink from "next/link"

const useStyles: any = makeStyles(() => ({
  container: {
    marginTop: theme.spacing(2),
  },
}))

const MypageSidebar: React.FC = () => {
  const classes = useStyles()
  return (
    <Card>
      <List>
        <NextLink href="/mypage" passHref>
          <ListItem button component="a">
            <ListItemText primary="Mypage Top"></ListItemText>
          </ListItem>
        </NextLink>
        <NextLink href="/mypage/profile" passHref>
          <ListItem button component="a">
            <ListItemText primary="Profile"></ListItemText>
          </ListItem>
        </NextLink>
        <NextLink href="/mypage/order/history" passHref>
          <ListItem button component="a">
            <ListItemText primary="Order History"></ListItemText>
          </ListItem>
        </NextLink>
        <NextLink href="/chat/chatroom/matchid1" passHref>
          <ListItem button component="a">
            <ListItemText primary="Contact"></ListItemText>
          </ListItem>
        </NextLink>
        <NextLink href="/cart" passHref>
          <ListItem button component="a">
            <ListItemText primary="Cart"></ListItemText>
          </ListItem>
        </NextLink>
        <NextLink href="/mypage/setting" passHref>
          <ListItem button component="a">
            <ListItemText primary="Setting"></ListItemText>
          </ListItem>
        </NextLink>
      </List>
    </Card>
  )
}

export default MypageSidebar
