import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import WhatshotIcon from '@mui/icons-material/Whatshot';

// firebase import
import { auth } from "../.config/firebaseConfig";
import { signOut } from "firebase/auth";

import SoxHead from '../assets/soxhead.png'

import { useNavigate } from 'react-router-dom';

import './css/AppBar.css';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar({ displayAccount, logout }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };
  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  return (
    <AppBar position="static" >
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          {/* <WhatshotIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TINAPP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => {
                handleCloseNavMenu();
                navigate('/security/login');
              }}>
                <Typography textAlign="center">Le Terrier</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <img id='soxHead' src={SoxHead} alt="SoxHead" style={{ maxWidth: '42px', maxHeight: '42px' }} />
          <Typography
            id='titleLAND'
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TINAPP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate('/');
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Accueil
            </Button>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate('/security/login');
              }}
              style={{ fontFamily: 'Creepster', fontSize: '1.1rem' }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Le Terrier
            </Button>
          </Box>

          {/* box right centered */}
          {logout && (
            <Box
              alignSelf='centered'
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mr: 2,
              }}
            >
              <button id='logout-button' onClick={() => {
                signOut(auth)
                navigate("/")
              }}>
                <LogoutIcon id='logout-icon' sx={{ mr: 1 }} />
                <p id='logout-text'>Logout</p>
              </button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;