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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/esm/AccountCircle.js';
import { useNavigate } from 'react-router-dom';
import { isUserAuthed, selectTimeRange, setTimeRange } from '../features/userData/userDataSlice';
import { FormControl, InputLabel, Select } from '@mui/material';
import { createTheme } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

const theme = createTheme();

const pages = ['Register', 'Log In/Sign up'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const startTime = new Date(2021, 4);
const currentTime = new Date();
const years = Array.from({length: Math.ceil(currentTime.getFullYear() - startTime.getFullYear() + 1)}, (x, i) => {
  return new Date(startTime.getFullYear() + i, 3).getTime() + '-' + new Date(startTime.getFullYear() + i + 1, 2, 31).getTime();
})

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectTimeRange);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    switch(event.target.id) {
      case pages[0]:
        navigate("/ConventionApp/")
        break;
      case pages[1]:
        navigate("/ConventionApp/signIn");
        break;
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      <AppBar position="static" sx={{type: 'float'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
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
              NZ CONVENTIONS
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
                {pages.map((page) => (
                  <MenuItem key={page} name={page} onClick={handleCloseNavMenu}>
                    <Typography id={page} textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
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
              NZ CONVENTIONS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  name={page}
                  id={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <FormControl size="small" sx={{ m: 1, minWidth: 80}}>
              <InputLabel id="year-selector-label">Year</InputLabel>
              <Select
                labelId="year-selector-label"
                id="year-selector"
                value={selectedDate}
                label="Year"
                onChange={(e) => dispatch(setTimeRange(e.target.value))}
              >
                {years.map((year, i) => { 
                  return (<MenuItem key={year} value={year}>{
                    (new Date(Number(year.split('-')[0])).getFullYear() + ' - ' + new Date(Number(year.split('-')[1])).getFullYear())
                }</MenuItem>
                )})}
              </Select>
            </FormControl>

            {isUserAuthed() && (<Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"
                >
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
  );
}
export default ResponsiveAppBar;
