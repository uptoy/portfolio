import React, { SyntheticEvent } from 'react'
import { alpha } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import Link from 'src/components/Link'
import { Menu, MenuItem, Badge, InputBase, AppBar, Toolbar, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import theme from 'src/theme'
import { common } from '@material-ui/core/colors'
import FavoriteBorderIcon from '@material-ui/icons/Favorite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { useAuth } from 'src/context/AuthContext'

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: common.white,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 8),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '13ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  authText: {
    textAlign: 'left',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    fontSize: '0.5em'
  }
}))

// export default function PrimarySearchAppBar(props: HeaderProps) {
export default function CommonHeader() {
  // const { sections, title } = props
  const { user, isAuthenticated, signOut } = useAuth()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorEl1, setAnchorEl1] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl1, setMobileMoreAnchorEl1] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMenuOpen1 = Boolean(anchorEl1)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const isMobileMenuOpen1 = Boolean(mobileMoreAnchorEl1)

  const handleProfileMenuOpen = (e: SyntheticEvent<null, EventTarget>): void => {
    setAnchorEl(e.currentTarget)
  }
  const handleProfileMenuOpen1 = (e: SyntheticEvent<null, EventTarget>): void => {
    setAnchorEl1(e.currentTarget)
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

  const handleMobileMenuOpen = (event: SyntheticEvent<null, EventTarget>): void => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen1 = (event: SyntheticEvent<null, EventTarget>) => {
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
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="warning">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
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
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="warning">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen1}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" className={classes.title} variant="h6" noWrap>
          Portfolio
        </Link>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton href="/wishlist" aria-label="show 17 new notifications" color="inherit">
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton href="/cart" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="warning">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {isAuthenticated ? (
            <div>
              {/* isAuth true */}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <div className={classes.authText}>
                    <p style={{ margin: 0 }}>{user?.username}</p>
                  </div>
                  <ArrowDropDownIcon />
                </div>
              </IconButton>
            </div>
          ) : (
            <div>
              {/* Guest */}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId1}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen1}
                color="inherit"
              >
                <AccountCircle />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <div className={classes.authText}>
                    <p style={{ marginBottom: 2, marginTop: 0 }}>Hello Guest</p>
                    <p style={{ margin: 0 }}>Please Signin</p>
                  </div>
                  <ArrowDropDownIcon />
                </div>
              </IconButton>
            </div>
          )}
        </div>
        {/* mobile */}
        {isAuthenticated ? (
          <div>
            {/* isAuth true */}
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <div>
            {/* Guest */}
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId1}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen1}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </div>
        )}
      </Toolbar>
      {renderMobileMenu}
      {renderMobileMenu1}
      {renderMenu}
      {renderMenu1}
    </AppBar>
  )
}
