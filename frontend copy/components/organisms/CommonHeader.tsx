import React from "react"
import useSWR from "swr"
import {CustomLink, NavLink} from "components/common"
import {usePageDispatch} from "lib/context/PageContext"
import checkLogin from "lib/utils/checkLogin"
import storage from "lib/utils/storage"
import {alpha} from "@material-ui/core/styles"
import {makeStyles} from "@material-ui/styles"
import Link from "components/Link"
import {Menu, MenuItem, Badge, InputBase, AppBar, Toolbar, IconButton} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MailIcon from "@material-ui/icons/Mail"
import NotificationsIcon from "@material-ui/icons/Notifications"
import MoreIcon from "@material-ui/icons/MoreVert"
import theme from "theme"
import {common} from "@material-ui/core/colors"
import FavoriteBorderIcon from "@material-ui/icons/Favorite"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"

const useStyles: any = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: common.white,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 8),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "13ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}))

// export default function PrimarySearchAppBar(props: HeaderProps) {
export default function CommonHeader() {
  const setPage = usePageDispatch()
  const {data: currentUser} = useSWR("user", storage)
  const isLoggedIn = checkLogin(currentUser)

  const handleClick = React.useCallback(() => setPage(0), [])
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{vertical: "top", horizontal: "right"}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: "top", horizontal: "right"}}
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
      <MenuItem onClick={handleMenuClose}>
        <Link href="/auth/signout">LogOut</Link>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: "top", horizontal: "right"}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: "top", horizontal: "right"}}
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
              input: classes.inputInput,
            }}
            inputProps={{"aria-label": "search"}}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton href="/favorite" aria-label="show 17 new notifications" color="inherit">
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton href="/cart" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="warning">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {isLoggedIn ? (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              <NavLink
                href={`/profile/${currentUser?.username}`}
                as={`/profile/${currentUser?.username}`}
              >
                <span onClick={handleClick}>{currentUser?.username}</span>
              </NavLink>
            </IconButton>
          ) : (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              <div>
                <li className="nav-item">
                  <NavLink href="/user/login" as="/user/login">
                    Sign in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink href="/user/register" as="/user/register">
                    Sign up
                  </NavLink>
                </li>
              </div>
            </IconButton>
          )}
        </div>
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
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  )
}
