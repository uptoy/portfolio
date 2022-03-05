import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Theme, makeStyles } from '@material-ui/core/styles'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import CategoryIcon from '@material-ui/icons/Category'
import DashboardIcon from '@material-ui/icons/Dashboard'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import PaymentIcon from '@material-ui/icons/Payment'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles: any = makeStyles((theme: Theme) => ({
  list: {
    color: theme.palette.common.white,
  },
  listItem: {
    color: '#fff',
  },
}))

interface Links {
  href: string
  icon: React.ReactElement
  title: string
}

const LINKS: Links[] = [
  {
    href: '/dashboard',
    icon: <DashboardIcon />,
    title: 'Dashboard',
  },
  {
    href: '/transactions',
    icon: <PaymentIcon />,
    title: 'Transactions',
  },
  {
    href: '/budgets',
    icon: <AccountBalanceIcon />,
    title: 'Budgets',
  },
  {
    href: '/categories',
    icon: <CategoryIcon />,
    title: 'Categories',
  },
  {
    href: '/report',
    icon: <EqualizerIcon />,
    title: 'Report',
  },
  {
    href: '/settings',
    icon: <SettingsIcon />,
    title: 'Settings',
  },
  {
    href: '/account',
    icon: <PersonIcon />,
    title: 'Account',
  },
]

const SidebarList = () => {
  const classes = useStyles()

  const router = useRouter()

  const getIsActive = (path: string) => {
    return path === location.pathname
  }

  return (
    <List className={classes.list}>
      {LINKS.map((link, index) => (
        <ListItem
          key={index}
          selected={getIsActive(link.href)}
        >
          <ListItemIcon className={classes.listItem}>{link.icon}</ListItemIcon>
          <ListItemText primary={link.title} />
        </ListItem>
      ))}
    </List>
  )
}

export default SidebarList
