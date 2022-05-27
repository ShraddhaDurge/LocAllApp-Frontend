import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton, Box, Tooltip, Button, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AnalyticsIcon from '@mui/icons-material/Analytics';
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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Badge from "@material-ui/core/Badge";
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    '&:hover':{
            backgroundColor:"#0277BD",
        },
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  basketIcon: {
      marginLeft: theme.spacing(2),
      '&:hover':{
              padding: 10,
              borderRadius: 50,
              backgroundColor:"#0277BD",

          },
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
  const BarStyling = {width:"20rem",background:"#B39DDB", border:"none", padding:"0.5rem", marginRight:"5rem"};

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

  const verifyVendors = () => {
   setAnchorEl(null);
    navigate('/vendorVerification', {replace: true})
  };

  const goHome = () => {
    setAnchorEl(null);
    navigate('/adminHome', {replace: true})

  };

//  const goAnalytics = () => {
//      navigate(, {replace: true})
//
//    };

  const searchProduct = () => {

    };

        const [itemCount, setItemCount] = React.useState(0);
        const dataInfo = JSON.parse(localStorage.getItem("myInfo"))
        const userid = dataInfo.id;
         React.useEffect(() => {
                axios.get(`http://localhost:8088/customer/getBasket/${userid}`)
              .then((res) => {
                    var len = Object.keys(res.data.basketItems).length

                     console.log(len);
                     setItemCount(len);

                     })
            }, [userid]);


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
              {auth && (
                  <div >

                      <Button onClick={handleMenu} className={classes.menuButton} startIcon={<AccountCircleIcon />}
                       size="large" style={{ fontSize: 15, textTransform: 'none', color: 'white' }} >
                              <Typography >Hello, {dataInfo.username}</Typography>
                      </Button>

                  </div>
                )}
              <Tooltip title="Go to User Analytics">
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="User Analytics" onClick={()=> window.open("https://analytics.google.com/analytics/web/?authuser=0&hl=en#/p301705009/realtime/overview?params=_u..nav%3Dmaui&collectionId=app", "_blank")}>
                    <AnalyticsIcon/>
                  </IconButton>
              </Tooltip>
              <Tooltip title="Verify Vendors">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="User Analytics" onClick={verifyVendors}>
                      <StoreMallDirectoryIcon/>
                    </IconButton>
                </Tooltip>

              <Tooltip title="SignOut">
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="signout" onClick={handleSignout}>
                    <LogoutIcon/>
                  </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </div>
    </Box>
  );
}