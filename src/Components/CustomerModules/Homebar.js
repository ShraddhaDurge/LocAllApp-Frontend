import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton, Box, Tooltip, Button, TextField, Grid } from '@material-ui/core';
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
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import logo from '../Images/logo1.png';
import Link from '@mui/material/Link';
import useAutocomplete from '@mui/material/useAutocomplete';
import Image from '../Images/2593108.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Badge from "@material-ui/core/Badge";
import Popper from '@mui/material/Popper';
import SearchBar from './SearchBar';
import SearchIcon from '@mui/icons-material/Search';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import TagBar from './TagBar';
import TagIcon from '@mui/icons-material/Tag';

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

  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem", marginRight:"5rem"};
  const [anchorElTwo, setAnchorElTwo] = React.useState(null);
  const [openTwo, setOpenTwo] = React.useState(false);

   const pincode=JSON.parse(localStorage.getItem("customerPincode"))
   const initialValues = {
       pin : pincode
   }
      const [pin, setPin] = React.useState(pincode)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    const handleCloseTwo = () => {
      setAnchorElTwo(null);
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
      navigate('/pastOrders', {replace: true})

    };

  const goHome = () => {
    navigate('/customerHome', {replace: true})

  };
  const goToShoppingBasket = () => {
      navigate('/shoppingBasket', {replace: true})
    };

      const changeLocation = (event) => {
          setAnchorElTwo(event.currentTarget);
          setOpenTwo((prevOpen) => !prevOpen);
//          navigate('/shoppingBasket', {replace: true})
        };

    const changePincode = (e) =>  {
        console.log(e.target.value)
        setPin(e.target.value)
        console.log(pin)
    }

  const [searchDialog, setSearchDialog] = React.useState({ isOp: false });
  const searchProduct = (e) => {
      setSearchDialog({isOp:true})
    };

  const [searchTagsDialog, setSearchTagsDialog] = React.useState({ isOp: false });
  const searchTags = (e) => {
      setSearchTagsDialog({isOp:true})
    };

        const [itemCount, setItemCount] = React.useState(0);
        const dataInfo = JSON.parse(localStorage.getItem("myInfo"))
        const userid = dataInfo.id;
         React.useEffect(() => {
                axios.get(`http://localhost:8088/customer/getBasket/${userid}`)
              .then((res) => {
                    var len = Object.keys(res.data.basketItems).length
                     setItemCount(len);

                     })
            }, [userid]);



    const onSubmit = async (e) => {
       e.preventDefault();
       console.log(pin)
       localStorage.setItem('customerPincode',JSON.stringify(pin))
       setAnchorElTwo(null);
       window.location.reload()
    }
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

                <Tooltip title="Get Tags">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Home" onClick={searchTags}>
                    <TagIcon/>
                    </IconButton></Tooltip>

              <Tooltip title="Search Product">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Home" onClick={searchProduct}>
                <SearchIcon/>
                </IconButton></Tooltip>
              {auth && (
                <div >
                  <Tooltip title="Go to Home page">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Home" onClick={goHome}>
                      <HomeIcon/>
                    </IconButton></Tooltip>
                   <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Location" onClick={changeLocation}>
                     <LocationOnIcon/><Typography variant='overline'>{pincode}</Typography>
                   </IconButton>
                   <Popper open={openTwo} anchorEl={anchorElTwo} placement='bottom' transition onClose={handleCloseTwo}>
                           {({ TransitionProps }) => (
                             <Fade {...TransitionProps} timeout={350}>
                               <Paper>

                                 <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                     {(props) => (
                                         <Form>
                                            <Grid container>
                                             <Grid item xs={8} style={{padding:'10px'}}>
                                                 <Field as={TextField} label='Enter DeliveryPincode' name="pincode" fullWidth required value={pin}
                                                 error={props.errors.pin && props.touched.pin} onInput={props.handleChange}
                                                 onChange={changePincode} helperText={<ErrorMessage name="pincode" />}/>
                                             </Grid>
                                             <Grid item xs={3} style={{padding:'20px 10px'}}>
                                                <Button type='submit' color='primary' variant="contained" onClick={onSubmit}
                                                   disabled={props.isSubmitting} fullWidth>
                                                   {props.isSubmitting ? "Loading" : "Submit"}
                                                </Button>
                                                </Grid>
                                             </Grid>
                                         </Form>
                                     )}
                                 </Formik>
                                 <Grid style={{padding:'0px 10px'}}>
                                  <Link href="/customerProfile" underline="always">
                                    {'Change Address?'}
                                  </Link>
                                  </Grid>
                               </Paper>
                             </Fade>
                           )}
                         </Popper>
                   <Tooltip title="Shopping Basket">
                          <Badge badgeContent={itemCount} className={classes.basketIcon} color="primary" aria-label="Shopping Basket" onClick={goToShoppingBasket}>
                              <ShoppingBasketIcon />{" "}
                            </Badge>
                            </Tooltip>

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
       <SearchBar searchDialog={searchDialog}
          setSearchDialog={setSearchDialog} />
        <TagBar searchTagsDialog={searchTagsDialog}
                  setSearchTagsDialog={setSearchTagsDialog} />
    </Box>
  );
}