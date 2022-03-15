import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton, Box, Tooltip, Button, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import logo from '../Images/logo1.png';
//import SearchBar from "material-ui-search";
import useAutocomplete from '@mui/material/useAutocomplete';
import Image from '../Images/2593108.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    '&:hover':{
            backgroundColor:"#0277BD",
        },
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    // keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


export default function MenuAppBar(props) {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [search, setSearch] = React.useState('')
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem", marginRight:"5rem"};

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let navigate = useNavigate();

  const handleSignout = () => {
    setAnchorEl(null);
    navigate('/', {replace: true})
    localStorage.clear();
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/customerProfile', {replace: true})

  };

  const handlePastOrders = () => {
      setAnchorEl(null);
//      navigate('/pastOrders', {replace: true})

    };

  const goHome = () => {
    navigate('/customerHome', {replace: true})

  };
  const goToShoppingBasket = () => {
      navigate('/shoppingBasket', {replace: true})

    };

  const searchProduct = () => {

    };

  const dataInfo = JSON.parse(localStorage.getItem("myInfo"))
    console.log(dataInfo.username)
  return (
    <Box mb={10}>
      <div className={classes.root}>

        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar style={{ height: 60, backgroundColor:"#81D4FA"}}>

            <Toolbar>
              <Typography variant="h6" className={classes.title}  >
                <img src={logo} alt="logo" height="50" width="200" align="center" onClick={goHome} style={{cursor: 'pointer'}}/>
              </Typography>

              <input
                   style={BarStyling}
                   key="random1"
                   value={search}
                   placeholder={"search product"}
                   onChange={(e) => setSearch(e.target.value)}
                  />
              {auth && (
                <div >
                  <Tooltip title="Go to Home page">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Home" onClick={goHome}>
                      <HomeIcon/>
                    </IconButton></Tooltip>
                   <Tooltip title="Shopping Basket">
                          <IconButton className={classes.menuButton} color="inherit" aria-label="Cart" onClick={goToShoppingBasket}>
                            <ShoppingBasketIcon/>
                          </IconButton></Tooltip>

                    <Button onClick={handleMenu} className={classes.menuButton} startIcon={<AccountCircleIcon />} endIcon={<ArrowDropDownIcon />}
                     size="large" style={{ fontSize: 15, textTransform: 'none', color: 'white' }} >
                            <Typography >Hello, {dataInfo.username}</Typography>
                    </Button>
                  <StyledMenu
                    id="menu-appbar"
                    anchorEl={anchorEl}

                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile}>
                      <List>
                        <ListItem alignItems='center'>
                          <ListItemIcon ><PersonIcon /></ListItemIcon>
                          <ListItemText>
                            Profile
                          </ListItemText>
                        </ListItem>
                      </List>
                    </MenuItem>
                    <MenuItem onClick={handlePastOrders}>
                      <List>
                        <ListItem alignItems='center'>
                          <ListItemIcon ><DashboardIcon /></ListItemIcon>
                          <ListItemText>
                            View past orders
                          </ListItemText>
                        </ListItem>
                      </List>
                    </MenuItem>
                    <MenuItem onClick={handleSignout}>
                      <List>
                        <ListItem alignItems='center'>
                          <ListItemIcon ><LogoutIcon /></ListItemIcon>
                          <ListItemText>
                            Signout
                          </ListItemText>
                        </ListItem>
                      </List>
                    </MenuItem>
                  </StyledMenu>

                </div>
              )}
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </div>
    </Box>
  );
}