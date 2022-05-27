import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper,Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../Images/logo1.png';
import Homebar from "./Homebar";
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';
import Image from '../Images/3.png';
import Tagline from '../Images/6.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { HashLink as Link } from 'react-router-hash-link';
import MostPopularProducts from "./MostPopularProducts";
import ProductCategories from "./ProductCategories";
import RecommendedProducts from "./RecommendedProducts";
import { ThemeProvider,createTheme } from '@material-ui/core/styles';


const theme = createTheme({
 typography: {
   fontFamily: ['"Montserrat"', 'Open Sans','Chilanka','cursive'].join(',')
  }
})

const CustomerHome=()=>{

    let navigate = useNavigate();

    const handleShopNow = () => {
            var elmntToView = document.getElementById("shop");
            elmntToView.scrollIntoView();

           };
      const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return(

        <Grid style={{overflowX:'hidden'}}>

        <Homebar />
         <ThemeProvider theme={theme}>
            <Paper style={{ backgroundColor:"#81D4FA"}}>

             <Grid container spacing={5}>
             <Grid item xs={6} >
                 <img src={Image} alt="welcome" height="480" />
             </Grid>
               <Grid item xs={6} style={{paddingTop:"80px", alignItems:"center"}}>
                <Typography variant='h3' color="textPrimary" > &nbsp;&nbsp;&nbsp;Welcome to LocALL!</Typography>
                <br/>
                <img src={Tagline} alt="welcome" height="50" width="500"/>
                    <Grid style={{paddingTop:"120px", paddingLeft:"160px"}}>
                        <Button type='submit'  variant="contained" color="primary" onClick={handleShopNow} >Shop Now &nbsp;&nbsp;&nbsp;&nbsp;  >></Button>
                    </Grid>
                </Grid>

            </Grid>
             </Paper>
             <div class="shop" id="shop" >
             <br/><br/>
                <RecommendedProducts />
                <br/>
                <MostPopularProducts />
                <br/>
                <ProductCategories />

             </div>
        </ThemeProvider >
    </Grid>
)

}

export default CustomerHome;