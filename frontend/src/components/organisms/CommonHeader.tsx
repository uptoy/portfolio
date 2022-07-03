import React from 'react'
import Link from 'src/components/Link'
import { Typography, Menu, MenuItem, Badge, InputBase, AppBar, Toolbar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/More'
import theme from 'src/theme'
import { common } from '@mui/material/colors'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useAuth } from 'src/context/AuthContext'

// const useStyles: any = makeStyles(() => ({
//   grow: {
//     flexGrow: 1
//   },
//   menuButton: {
//     marginRight: theme.spacing(2)
//   },
//   title: {
//     color: common.white,
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block'
//     }
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.common.white, 0.25)
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto'
//     }
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   inputRoot: {
//     color: 'inherit'
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 8),
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '13ch'
//     }
//   },
//   sectionDesktop: {
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'flex'
//     }
//   },
//   sectionMobile: {
//     display: 'flex',
//     [theme.breakpoints.up('md')]: {
//       display: 'none'
//     }
//   },
//   authText: {
//     textAlign: 'left',
//     marginRight: theme.spacing(1),
//     marginLeft: theme.spacing(1),
//     fontSize: '0.5em'
//   }
// }))

// export default function PrimarySearchAppBar(props: HeaderProps) {
export default function CommonHeader() {
  // const { sections, title } = props
  const { user, isAuthenticated, signOut } = useAuth()
  // const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorEl1, setAnchorEl1] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl1, setMobileMoreAnchorEl1] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMenuOpen1 = Boolean(anchorEl1)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const isMobileMenuOpen1 = Boolean(mobileMoreAnchorEl1)

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleProfileMenuOpen1 = (event: any) => {
    setAnchorEl1(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuClose1 = () => {
    setMobileMoreAnchorEl1(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }
  const handleMenuClose1 = () => {
    setAnchorEl1(null)
    handleMobileMenuClose1()
  }

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen1 = (event: any) => {
    setMobileMoreAnchorEl1(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href="/mypage">Mypage</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="/mypage/profile">ProfileUpdate</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="/mypage/order/history">OrderHistory</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="/mypage/setting">Setting</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="/mypage/contact">Contact</Link>
      </MenuItem>
      <MenuItem onClick={signOut}>
        <Link href="/auth/signout">SignOut</Link>
      </MenuItem>
    </Menu>
  )
  const menuId1 = 'primary-search-account-menu1'
  const renderMenu1 = (
    <Menu
      anchorEl={anchorEl1}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId1}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen1}
      onClose={handleMenuClose1}
    >
      <MenuItem>
        <Link href="/auth/signin">SignIn</Link>
      </MenuItem>
      <MenuItem>
        <Link href="/auth/signup">SignUp</Link>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="warning">
            <MailIcon />
          </Badge>
        </IconButton>
        <Typography variant="inherit">Messages</Typography>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="warning">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography variant="inherit">Notifications</Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Typography variant="inherit">Profile</Typography>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId1 = 'primary-search-account-menu-mobile1'
  const renderMobileMenu1 = (
    <Menu
      anchorEl={mobileMoreAnchorEl1}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId1}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen1}
      onClose={handleMobileMenuClose1}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="warning">
            <MailIcon />
          </Badge>
        </IconButton>
        <Typography variant="inherit">Messages</Typography>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="warning">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography variant="inherit">Notifications</Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen1}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Typography variant="inherit">Profile</Typography>
      </MenuItem>
    </Menu>
  )

  return (
    <AppBar position="relative">
      <Toolbar>Portfolio</Toolbar>
    </AppBar>
  )
}
