import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900', textDecoration: 'none' };
  } else {
    return { color: '#ffffff', textDecoration: 'none' };
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const MaterialAppBar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [open] = React.useState(false);
  const anchorRef = React.useRef(null);

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // function handleListKeyDown(event) {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     setOpen(false);
  //   }
  // }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
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
      <div style={{ backgroundColor: '#404040' }}>
        <MenuItem>
          <Link style={isActive(history, '/')} to='/'>
            <IconButton aria-label='Home' color='inherit' style={{'borderRadius': '0px'}}>
              <HomeIcon />
            </IconButton>
            Home
          </Link>
        </MenuItem>

        {!isAuthenticated() && (
          <Fragment>
            <MenuItem>
              <Link style={isActive(history, '/signin')} to='/signin'>
                <IconButton aria-label='Signin' color='inherit' style={{'borderRadius': '0px'}}>
                  <AccountCircleIcon />
                </IconButton>
                Signin
              </Link>
            </MenuItem>

            <MenuItem>
              <Link style={isActive(history, '/signup')} to='/signup'>
                <IconButton aria-label='Signup' color='inherit' style={{'borderRadius': '0px'}}>
                  <PersonAddIcon />
                </IconButton>
                Signup
              </Link>
            </MenuItem>
          </Fragment>
        )}

        {isAuthenticated() && (
          <MenuItem>
            <span
              style={{ cursor: 'pointer', color: '#ffffff' }}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              <IconButton aria-label='Signout' color='inherit' style={{'borderRadius': '0px'}}>
                <ExitToAppIcon />
              </IconButton>
              Signout
            </span>
          </MenuItem>
        )}
      </div>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='fixed'>
        <Toolbar>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link style={isActive(history, '/')} to='/'>
              <IconButton aria-label='Home' color='inherit' style={{'borderRadius': '0px'}}>
                <HomeIcon />
                <Typography noWrap>Home</Typography>
              </IconButton>
            </Link>

            {!isAuthenticated() && (
              <Fragment>
                <Link style={isActive(history, '/signin')} to='/signin'>
                  <IconButton aria-label='Signin' color='inherit' style={{'borderRadius': '0px'}}>
                    <AccountCircleIcon />
                    <Typography noWrap>Log in</Typography>
                  </IconButton>
                </Link>

                <Link style={isActive(history, '/signup')} to='/signup'>
                  <IconButton aria-label='Signup' color='inherit' style={{'borderRadius': '0px'}}>
                    <PersonAddIcon />
                    <Typography noWrap>Sign up</Typography>
                  </IconButton>
                </Link>
              </Fragment>
            )}
            {isAuthenticated() && (
              <Fragment>
                <Link style={isActive(history, '/main')} to='/main'>
                  <IconButton aria-label='Main' color='inherit' style={{'borderRadius': '0px'}}>
                    <AccountCircleIcon />
                    <Typography noWrap>Main</Typography>
                  </IconButton>
                </Link>

                <Link style={isActive(history, '/areas')} to='/areas'>
                  <IconButton aria-label='Areas' color='inherit' style={{'borderRadius': '0px'}}>
                    <PersonAddIcon />
                    <Typography noWrap>Areas</Typography>
                  </IconButton>
                </Link>
            </Fragment>
            )}
            {isAuthenticated() && (
                <Link to="/#">
                  <span
                    style={{ cursor: 'pointer', color: '#ffffff' }}
                    onClick={() =>
                      signout(() => {
                        history.push('/');
                      })
                    }
                  >
                    <IconButton aria-label='Signout' color='inherit' style={{'borderRadius': '0px'}}>
                      <ExitToAppIcon />
                    </IconButton>
                    Log out
                  </span>
                </Link>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default withRouter(MaterialAppBar);
