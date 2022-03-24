import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button,Typography, makeStyles, Card, Box, CardContent } from '@material-ui/core';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const useStyles=makeStyles({
    card:{
        backgroundColor:"#D1C4E9",
        width:"1000px",
        height:"450px",
        margin:"10px 80px",
        boxShadow: '0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)',
        overflowY: 'scroll'
    }
    ,button:{
        color:"primary",
        '&:hover':{
            backgroundColor:"#2471A3",
        },
        marginTop:"20px",

    }
    });
const VendorDisplayProduct = (props) =>{
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:"250px", backgroundColor: '#5E35B1'}
    const linkstyle={color:'#FFF', hover: "#000", textDecoration: 'none', cursor: 'pointer', padding:'10px 10px' }
    const pid=JSON.parse(localStorage.getItem("product id"))
    console.log("pid="+pid)


    const productInfo = JSON.parse(localStorage.getItem("productInfo"))
    console.log("productInfo in display= "+productInfo)
    const classes=useStyles();
    return(
        <html style={{height:'100%'}}>
        <body style={{height:'100vh'}}>
        <Box m={5}>

<Grid container  spacing={6} >

    <Grid item xs={12} sm={6} md={6}>
        <Card className={classes.card}>
                <CardContent>
                <Grid container spacing={8}>
                    <Grid item xs={6} style={{ margin:'0px 0px', padding:'0px 0px'}}>
                        <img src={`data:image/png;base64,${productInfo.productImage}`} background_size= "cover" border-radius= "200px" background_repeat= "no-repeat" alt="product" height= "465" width="550"/>
                    </Grid>
                <Grid item xs={6} style={{ margin:'0px auto', padding:'10px 0px 10px 80px', align:"center"}}>
                    <br/>
                    <Typography gutterBottom variant="h3" component="div" color="primary" >
                        <b>{productInfo.productName}</b>
                    </Typography>
                    <br/>
                    <Typography gutterBottom variant="h6" component="div" color="textPrimary">
                    Product Price:  <CurrencyRupeeIcon/>{productInfo.price} &nbsp;per item
                    </Typography>


                    <br/>
                    <Typography gutterBottom variant="h6" component="div" color="textPrimary">
                    Available Quantity:  {productInfo.quantAvailable} units
                    </Typography>

                    <br/>
                    <Typography gutterBottom variant="h6" component="div" color="textPrimary">
                    Product Description:  {productInfo.productDesc}
                    </Typography>
                    <br/>
                    <Typography gutterBottom variant="h6" component="div" color="textPrimary">
                    Tags:  {productInfo.productTags.map((tag, i) => (<span key={i}>#{tag.tag}</span>))}
                    </Typography>
                    <br/>
                    <Button type='submit' variant="contained" style={btnstyle} fullWidth>
                        <Link to="/inventoryManagement" style={linkstyle}>Go Back</Link>
                    </Button>

                    </Grid>
                </Grid>

                </CardContent>
        </Card>
    </Grid>

</Grid>
</Box>
        </body>
        </html>
        )

}
export default VendorDisplayProduct;