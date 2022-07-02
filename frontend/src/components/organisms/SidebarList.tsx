import { ListItemText, List, ListItem, ListItemIcon } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import PaymentsIcon from '@mui/icons-material/Payments'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonIcon from '@mui/icons-material/Person'
import { useRouter } from 'next/router'
import React from 'react'
import theme from 'src/theme'

// const useStyles: any = makeStyles(() => ({
//   list: {
//     color: theme.palette.common.white
//   },
//   listItem: {
//     color: '#fff'
//   }
// }))

interface Links {
  href: string
  icon: React.ReactElement
  title: string
}

const LINKS: Links[] = [
  {
    href: '/dashboard',
    icon: <DashboardIcon />,
    title: 'Dashboard'
  },
  {
    href: '/transactions',
    icon: <PaymentsIcon />,
    title: 'Transactions'
  },
  {
    href: '/budgets',
    icon: <AccountBalanceIcon />,
    title: 'Budgets'
  },
  {
    href: '/category',
    icon: <CategoryIcon />,
    title: 'Categories'
  },
  {
    href: '/report',
    icon: <EqualizerIcon />,
    title: 'Report'
  },
  {
    href: '/account',
    icon: <PersonIcon />,
    title: 'Account'
  },
  {
    href: '/settings',
    icon: <SettingsIcon />,
    title: 'Settings'
  }
]

const SidebarList = () => {
  // const classes = useStyles()

  const router = useRouter()

  const getIsActive = (path: string) => {
    return path === router.pathname
  }

  // return (
  //   <List className={classes.list}>
  //     {LINKS.map((link, index) => (
  //       <ListItem key={index} selected={getIsActive(link.href)}>
  //         <ListItemIcon className={classes.listItem}>{link.icon}</ListItemIcon>
  //         <ListItemText primary={link.title} />
  //       </ListItem>
  //     ))}
  //   </List>
  // )
  return <div>aaa</div>
}

export default SidebarList
